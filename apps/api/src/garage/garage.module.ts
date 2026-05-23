import { Module } from "@nestjs/common";
import { GarageService } from "./garage.service";
import { GarageController } from "./garage.controller";
import { InternalServiceRecordsController } from "./internal-service-records.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  providers: [GarageService],
  controllers: [GarageController, InternalServiceRecordsController],
})
export class GarageModule {}
