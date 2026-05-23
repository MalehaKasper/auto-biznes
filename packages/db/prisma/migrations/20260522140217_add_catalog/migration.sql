-- CreateEnum
CREATE TYPE "CatalogListingType" AS ENUM ('SALE', 'WANTED');

-- CreateEnum
CREATE TYPE "CatalogListingStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'SOLD', 'CLOSED');

-- CreateEnum
CREATE TYPE "CatalogInquiryType" AS ENUM ('BUY', 'EXCHANGE', 'QUESTION', 'CALLBACK', 'EVALUATE');

-- CreateEnum
CREATE TYPE "CatalogInquiryStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'CLOSED');

-- CreateTable
CREATE TABLE "catalog_listings" (
    "id" TEXT NOT NULL,
    "type" "CatalogListingType" NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "yearMax" INTEGER,
    "mileage" INTEGER,
    "mileageMax" INTEGER,
    "price" DECIMAL(12,2),
    "bargainEnabled" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT NOT NULL,
    "photos" TEXT[],
    "status" "CatalogListingStatus" NOT NULL DEFAULT 'AVAILABLE',
    "vehicleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "catalog_listings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog_inquiries" (
    "id" TEXT NOT NULL,
    "type" "CatalogInquiryType" NOT NULL,
    "status" "CatalogInquiryStatus" NOT NULL DEFAULT 'NEW',
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "message" TEXT,
    "offeredPrice" DECIMAL(12,2),
    "tradeVehicleMake" TEXT,
    "tradeVehicleModel" TEXT,
    "tradeVehicleYear" INTEGER,
    "tradeVehicleMileage" INTEGER,
    "tradeVehiclePlate" TEXT,
    "listingId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "catalog_inquiries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "catalog_listings" ADD CONSTRAINT "catalog_listings_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog_inquiries" ADD CONSTRAINT "catalog_inquiries_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "catalog_listings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
