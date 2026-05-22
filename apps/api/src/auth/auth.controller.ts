import {
  Controller,
  Post,
  Patch,
  Body,
  Res,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { Response, Request } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import type { JwtPayload } from "../common/decorators/current-user.decorator";
import { IsString, Length, Matches, IsEmail, IsOptional } from "class-validator";

class RequestOtpDto {
  @Matches(/^\+380\d{9}$/)
  phone: string;
}

class VerifyOtpDto {
  @Matches(/^\+380\d{9}$/)
  phone: string;

  @IsString()
  @Length(6, 6)
  code: string;
}

class UpdateProfileDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("otp/request")
  @HttpCode(HttpStatus.OK)
  async requestOtp(@Body() dto: RequestOtpDto) {
    return this.authService.requestOtp(dto.phone);
  }

  @Post("otp/verify")
  @HttpCode(HttpStatus.OK)
  async verifyOtp(@Body() dto: VerifyOtpDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, isFirstLogin } =
      await this.authService.verifyOtp(dto.phone, dto.code);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { accessToken, isFirstLogin };
  }

  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refresh_token as string;
    if (!refreshToken) throw new Error("No refresh token");

    const tokens = await this.authService.refreshTokens(refreshToken);

    res.cookie("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }

  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("refresh_token");
    return { success: true };
  }

  @Patch("profile")
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpdateProfileDto
  ) {
    await this.authService.updateProfile(user.sub, dto.name, dto.email);
    return { success: true };
  }
}
