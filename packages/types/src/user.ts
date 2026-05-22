import { z } from "zod";

export const UserStatus = {
  SHADOW: "SHADOW",
  REGISTERED: "REGISTERED",
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const phoneSchema = z
  .string()
  .regex(/^\+380\d{9}$/, "Phone must be in format +380XXXXXXXXX");

export const createBookingSchema = z.object({
  phone: phoneSchema,
  name: z.string().min(2).max(100),
  serviceType: z.enum(["STO", "TIRE"]),
  scheduledAt: z.string().datetime().optional(),
  notes: z.string().max(500).optional(),
  plate: z.string().max(20).optional(),
  vin: z.string().length(17).optional(),
  make: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  year: z.number().int().min(1900).max(2100).optional(),
  color: z.string().max(50).optional(),
});
export type CreateBookingDto = z.infer<typeof createBookingSchema>;

export const requestOtpSchema = z.object({
  phone: phoneSchema,
});
export type RequestOtpDto = z.infer<typeof requestOtpSchema>;

export const verifyOtpSchema = z.object({
  phone: phoneSchema,
  code: z.string().length(6),
});
export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().optional(),
});
export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;

export const createVehicleSchema = z.object({
  plate: z.string().min(1).max(20),
  vin: z.string().length(17).optional(),
  make: z.string().max(100).optional(),
  model: z.string().max(100).optional(),
  year: z.number().int().min(1900).max(2100).optional(),
  color: z.string().max(50).optional(),
});
export type CreateVehicleDto = z.infer<typeof createVehicleSchema>;

export const updateVehicleSchema = createVehicleSchema.partial();
export type UpdateVehicleDto = z.infer<typeof updateVehicleSchema>;
