import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { SmsQueue } from "../sms/sms.queue";

const OTP_TTL_MS = 5 * 60 * 1000;
const OTP_COOLDOWN_MS = 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly smsQueue: SmsQueue
  ) {}

  async requestOtp(phone: string): Promise<{ retryAfter: number }> {
    const recent = await this.prisma.otpCode.findFirst({
      where: {
        phone,
        createdAt: { gte: new Date(Date.now() - OTP_COOLDOWN_MS) },
        usedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });

    if (recent) {
      const retryAfter = Math.ceil(
        (OTP_COOLDOWN_MS - (Date.now() - recent.createdAt.getTime())) / 1000
      );
      throw new ConflictException({ retryAfter });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    await this.prisma.otpCode.create({
      data: { phone, code, expiresAt: new Date(Date.now() + OTP_TTL_MS) },
    });

    await this.smsQueue.sendOtp(phone, code);
    return { retryAfter: 60 };
  }

  async verifyOtp(
    phone: string,
    code: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    isFirstLogin: boolean;
  }> {
    const otp = await this.prisma.otpCode.findFirst({
      where: {
        phone,
        code,
        expiresAt: { gte: new Date() },
        usedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });

    if (!otp) throw new UnauthorizedException("Invalid or expired OTP");

    await this.prisma.otpCode.update({
      where: { id: otp.id },
      data: { usedAt: new Date() },
    });

    const user = await this.upsertUser(phone);
    const isFirstLogin = user.status === "SHADOW" && !user.name;

    return {
      ...(await this.generateTokens(user.id, user.phone)),
      isFirstLogin,
    };
  }

  async refreshTokens(
    refreshToken: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = this.jwtService.verify<{ sub: string; phone: string }>(
        refreshToken,
        { secret: process.env.JWT_REFRESH_SECRET }
      );
      return this.generateTokens(payload.sub, payload.phone);
    } catch {
      throw new UnauthorizedException("Invalid refresh token");
    }
  }

  async updateProfile(
    userId: string,
    name: string,
    email?: string
  ): Promise<void> {
    const existing = email
      ? await this.prisma.user.findFirst({
          where: { email, NOT: { id: userId } },
        })
      : null;

    if (existing) throw new BadRequestException("Email already in use");

    await this.prisma.user.update({
      where: { id: userId },
      data: { name, email, status: "REGISTERED" },
    });
  }

  async upsertUser(phone: string) {
    return this.prisma.user.upsert({
      where: { phone },
      create: { phone, status: "SHADOW" },
      update: {},
    });
  }

  private async generateTokens(userId: string, phone: string) {
    const payload = { sub: userId, phone };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN ?? "15m") as never,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ?? "30d") as never,
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
