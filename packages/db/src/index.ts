export { PrismaClient } from "@prisma/client";
export type {
  User,
  Vehicle,
  UserVehicle,
  Booking,
  ServiceRecord,
  OtpCode,
} from "@prisma/client";
export {
  UserStatus,
  ServiceType,
  BookingStatus,
  OwnerType,
} from "@prisma/client";

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
