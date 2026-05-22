import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { SmsModule } from "../sms/sms.module";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Module({
  imports: [JwtModule.register({}), SmsModule],
  providers: [AuthService, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtAuthGuard, JwtModule, AuthService],
})
export class AuthModule {}
