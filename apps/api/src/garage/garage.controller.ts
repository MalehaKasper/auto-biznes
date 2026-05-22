import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
} from "@nestjs/common";
import { GarageService } from "./garage.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import type { JwtPayload } from "../common/decorators/current-user.decorator";
import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
  Length,
} from "class-validator";
import { Type } from "class-transformer";

class CreateVehicleDto {
  @IsString()
  @Length(1, 20)
  plate: string;

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

class UpdateVehicleDto extends CreateVehicleDto {}

@Controller("garage")
@UseGuards(JwtAuthGuard)
export class GarageController {
  constructor(private readonly garageService: GarageService) {}

  @Get("vehicles")
  getVehicles(
    @CurrentUser() user: JwtPayload,
    @Query("archived") archived?: string
  ) {
    return this.garageService.getVehicles(user.sub, archived === "true");
  }

  @Get("vehicles/:id")
  getVehicleDetails(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.garageService.getVehicleDetails(user.sub, id);
  }

  @Post("vehicles")
  addVehicle(@CurrentUser() user: JwtPayload, @Body() dto: CreateVehicleDto) {
    return this.garageService.addVehicle(user.sub, dto);
  }

  @Patch("vehicles/:id")
  updateVehicle(
    @CurrentUser() user: JwtPayload,
    @Param("id") id: string,
    @Body() dto: UpdateVehicleDto
  ) {
    return this.garageService.updateVehicle(user.sub, id, dto);
  }

  @Patch("vehicles/:id/hide")
  hideVehicle(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.garageService.hideVehicle(user.sub, id);
  }
}
