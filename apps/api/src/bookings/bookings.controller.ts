import {
  Controller,
  Post,
  Get,
  Param,
  Query,
  Body,
  NotFoundException,
} from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import {
  IsString,
  IsEnum,
  IsOptional,
  IsISO8601,
  IsNumber,
  Min,
  Max,
  Length,
  Matches,
} from "class-validator";
import { Type } from "class-transformer";

class CreateBookingDto {
  @Matches(/^\+380\d{9}$/)
  phone: string;

  @IsString()
  @Length(2, 100)
  name: string;

  @IsEnum(["STO", "TIRE"])
  serviceType: "STO" | "TIRE";

  @IsISO8601()
  @IsOptional()
  scheduledAt?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  plate?: string;

  @IsString()
  @Length(17, 17)
  @IsOptional()
  vin?: string;

  @IsString()
  @IsOptional()
  make?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsNumber()
  @Min(1900)
  @Max(2100)
  @Type(() => Number)
  @IsOptional()
  year?: number;

  @IsString()
  @IsOptional()
  color?: string;
}

@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Body() dto: CreateBookingDto) {
    return this.bookingsService.create(dto);
  }

  @Get("slots")
  async getSlots(
    @Query("serviceType") serviceType: string,
    @Query("date") date: string
  ) {
    return this.bookingsService.getSlots(serviceType, date);
  }

  @Get(":id/status")
  async getStatus(@Param("id") id: string) {
    const status = await this.bookingsService.getStatus(id);
    if (!status) throw new NotFoundException();
    return status;
  }
}
