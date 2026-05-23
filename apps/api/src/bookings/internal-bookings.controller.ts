import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UnauthorizedException,
  Headers,
} from "@nestjs/common";
import { BookingsService } from "./bookings.service";

class UpdateStatusDto {
  status: string;
  notes?: string;
}

@Controller("internal/bookings")
export class InternalBookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  private checkKey(internalKey: string | undefined) {
    const expected = process.env.INTERNAL_API_KEY;
    if (!expected || internalKey !== expected) {
      throw new UnauthorizedException("Invalid or missing X-Internal-Key");
    }
  }

  @Patch(":id/status")
  @HttpCode(HttpStatus.OK)
  async updateStatus(
    @Headers("x-internal-key") internalKey: string,
    @Param("id") id: string,
    @Body() body: UpdateStatusDto,
  ) {
    this.checkKey(internalKey);
    return this.bookingsService.updateStatus(id, body.status, body.notes);
  }
}
