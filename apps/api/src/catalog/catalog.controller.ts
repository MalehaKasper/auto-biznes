import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { CatalogService } from "./catalog.service";
import { createCatalogInquirySchema, getCatalogSchema } from "@auto/types";

@Controller("catalog")
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  async getListings(@Query() query: Record<string, string>) {
    const parsed = getCatalogSchema.safeParse(query);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten().fieldErrors);
    }
    return this.catalogService.getListings(parsed.data);
  }

  @Get(":id")
  async getListing(@Param("id") id: string) {
    return this.catalogService.getListingById(id);
  }

  @Post("inquiries")
  @HttpCode(HttpStatus.CREATED)
  async createInquiry(@Body() body: unknown) {
    const parsed = createCatalogInquirySchema.safeParse(body);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.flatten().fieldErrors);
    }
    return this.catalogService.createInquiry(parsed.data);
  }
}
