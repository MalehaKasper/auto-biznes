import { Module } from "@nestjs/common";
import { BookingsService } from "./bookings.service";
import { BookingsController } from "./bookings.controller";
import { InternalBookingsController } from "./internal-bookings.controller";
import { AuthModule } from "../auth/auth.module";
import { SmsModule } from "../sms/sms.module";

@Module({
  imports: [AuthModule, SmsModule],
  providers: [BookingsService],
  controllers: [BookingsController, InternalBookingsController],
  exports: [BookingsService],
})
export class BookingsModule {}
