import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UnprocessableEntityException,
  Headers,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

class CreateServiceRecordDto {
  vehicleId: string;
  bookingId?: string;
  serviceType: string;
  description: string;
  mileage?: number;
  cost?: number;
  performedAt: string;
}

@Controller("internal/service-records")
export class InternalServiceRecordsController {
  constructor(private readonly prisma: PrismaService) {}

  private checkKey(internalKey: string | undefined) {
    const expected = process.env.INTERNAL_API_KEY;
    if (!expected || internalKey !== expected) {
      throw new UnauthorizedException("Invalid or missing X-Internal-Key");
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Headers("x-internal-key") internalKey: string,
    @Body() body: CreateServiceRecordDto,
  ) {
    this.checkKey(internalKey);

    const vehicle = await this.prisma.vehicle.findUnique({ where: { id: body.vehicleId } });
    if (!vehicle) {
      throw new UnprocessableEntityException(`Vehicle ${body.vehicleId} not found`);
    }

    const record = await this.prisma.serviceRecord.create({
      data: {
        vehicleId: body.vehicleId,
        bookingId: body.bookingId ?? null,
        serviceType: body.serviceType,
        description: body.description,
        mileage: body.mileage ?? null,
        cost: body.cost ?? null,
        performedAt: new Date(body.performedAt),
      },
    });

    return { id: record.id };
  }
}
