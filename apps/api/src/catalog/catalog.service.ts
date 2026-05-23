import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { GetCatalogDto, CreateCatalogInquiryDto } from "@auto/types";

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async getListings(query: GetCatalogDto) {
    const { type, cursor, limit } = query;

    const where: Record<string, unknown> = { status: "AVAILABLE" };
    if (type === "sale") where["type"] = "SALE";
    else if (type === "wanted") where["type"] = "WANTED";

    const listings = await this.prisma.catalogListing.findMany({
      where,
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      orderBy: { createdAt: "desc" },
    });

    const hasMore = listings.length > limit;
    const data = hasMore ? listings.slice(0, limit) : listings;
    const nextCursor = hasMore ? data[data.length - 1].id : null;

    return { listings: data, nextCursor };
  }

  async getListingById(id: string) {
    const listing = await this.prisma.catalogListing.findUnique({
      where: { id },
    });
    if (!listing) throw new NotFoundException("Listing not found");
    return listing;
  }

  async createInquiry(dto: CreateCatalogInquiryDto) {
    const { listingId, type } = dto;

    if (listingId) {
      const listing = await this.prisma.catalogListing.findUnique({
        where: { id: listingId },
      });
      if (!listing) throw new NotFoundException("Listing not found");

      if (type === "BUY" && listing.type === "WANTED") {
        throw new UnprocessableEntityException(
          "BUY inquiry is only allowed for SALE listings"
        );
      }
    }

    if (
      (type === "EXCHANGE" || type === "EVALUATE") &&
      (!dto.tradeVehicleMake || !dto.tradeVehicleModel)
    ) {
      throw new BadRequestException(
        "tradeVehicleMake and tradeVehicleModel are required for EXCHANGE and EVALUATE"
      );
    }

    if (type === "QUESTION" && !dto.message) {
      throw new BadRequestException("message is required for QUESTION");
    }

    const inquiry = await this.prisma.catalogInquiry.create({
      data: {
        type,
        phone: dto.phone,
        name: dto.name,
        message: dto.message,
        offeredPrice: dto.offeredPrice ?? null,
        tradeVehicleMake: dto.tradeVehicleMake,
        tradeVehicleModel: dto.tradeVehicleModel,
        tradeVehicleYear: dto.tradeVehicleYear,
        tradeVehicleMileage: dto.tradeVehicleMileage,
        tradeVehiclePlate: dto.tradeVehiclePlate,
        listingId: listingId ?? null,
      },
    });

    return { id: inquiry.id, status: inquiry.status };
  }
}
