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

export const catalogInquiryTypeSchema = z.enum([
  "BUY",
  "EXCHANGE",
  "QUESTION",
  "CALLBACK",
  "EVALUATE",
]);
export type CatalogInquiryType = z.infer<typeof catalogInquiryTypeSchema>;

export const createCatalogInquirySchema = z
  .object({
    listingId: z.string().uuid().optional(),
    type: catalogInquiryTypeSchema,
    phone: phoneSchema,
    name: z.string().min(2).max(100),
    message: z.string().max(1000).optional(),
    offeredPrice: z.number().positive().optional(),
    tradeVehicleMake: z.string().max(100).optional(),
    tradeVehicleModel: z.string().max(100).optional(),
    tradeVehicleYear: z.number().int().min(1900).max(2100).optional(),
    tradeVehicleMileage: z.number().int().min(0).optional(),
    tradeVehiclePlate: z.string().max(20).optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.type === "EXCHANGE" || data.type === "EVALUATE") &&
      (!data.tradeVehicleMake || !data.tradeVehicleModel)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "tradeVehicleMake and tradeVehicleModel are required for EXCHANGE and EVALUATE",
        path: ["tradeVehicleMake"],
      });
    }
    if (data.type === "QUESTION" && !data.message) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "message is required for QUESTION",
        path: ["message"],
      });
    }
  });
export type CreateCatalogInquiryDto = z.infer<typeof createCatalogInquirySchema>;

export const getCatalogSchema = z.object({
  type: z.enum(["sale", "wanted"]).optional(),
  cursor: z.string().uuid().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  make: z.string().max(100).optional(),
  priceMin: z.coerce.number().nonnegative().optional(),
  priceMax: z.coerce.number().nonnegative().optional(),
  yearMin: z.coerce.number().int().min(1900).max(2100).optional(),
  yearMax: z.coerce.number().int().min(1900).max(2100).optional(),
});
export type GetCatalogDto = z.infer<typeof getCatalogSchema>;
