import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BullModule } from "@nestjs/bullmq";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { SmsModule } from "./sms/sms.module";
import { BookingsModule } from "./bookings/bookings.module";
import { GarageModule } from "./garage/garage.module";
import { CatalogModule } from "./catalog/catalog.module";
import { StorageModule } from "./storage/storage.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      connection: {
        url: process.env.REDIS_URL ?? "redis://localhost:6379",
      },
      defaultJobOptions: {
        attempts: 3,
        backoff: { type: "exponential", delay: 30000 },
        removeOnComplete: true,
        removeOnFail: false,
      },
    }),
    PrismaModule,
    SmsModule,
    AuthModule,
    BookingsModule,
    GarageModule,
    CatalogModule,
    StorageModule,
  ],
})
export class AppModule {}
