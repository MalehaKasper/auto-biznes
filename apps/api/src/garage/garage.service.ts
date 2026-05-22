import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class GarageService {
  constructor(private readonly prisma: PrismaService) {}

  async getVehicles(userId: string, archived = false) {
    const relations = await this.prisma.userVehicle.findMany({
      where: { userId, isHidden: archived },
      include: {
        vehicle: {
          include: {
            serviceRecords: {
              orderBy: { performedAt: "desc" },
              take: 1,
              select: { performedAt: true },
            },
            bookings: {
              where: { status: { in: ["PENDING", "CONFIRMED"] } },
              orderBy: { scheduledAt: "asc" },
              take: 1,
              select: { status: true, scheduledAt: true },
            },
          },
        },
      },
      orderBy: { ownedSince: "desc" },
    });

    return relations.map(({ vehicle }) => ({
      id: vehicle.id,
      plate: vehicle.plate,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      color: vehicle.color,
      lastServiceDate: vehicle.serviceRecords[0]?.performedAt ?? null,
      activeBooking: vehicle.bookings[0] ?? null,
    }));
  }

  async getVehicleDetails(userId: string, vehicleId: string) {
    const ownership = await this.prisma.userVehicle.findUnique({
      where: { userId_vehicleId: { userId, vehicleId } },
    });

    if (!ownership) throw new ForbiddenException();

    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
      include: {
        serviceRecords: {
          orderBy: { performedAt: "desc" },
          select: {
            id: true,
            serviceType: true,
            description: true,
            mileage: true,
            cost: true,
            performedAt: true,
          },
        },
      },
    });

    if (!vehicle) throw new NotFoundException();

    return vehicle;
  }

  async addVehicle(userId: string, data: {
    plate: string;
    vin?: string;
    make?: string;
    model?: string;
    year?: number;
    color?: string;
  }) {
    const vehicle = await this.prisma.vehicle.create({ data });

    await this.prisma.userVehicle.create({
      data: { userId, vehicleId: vehicle.id },
    });

    return vehicle;
  }

  async updateVehicle(userId: string, vehicleId: string, data: {
    plate?: string;
    vin?: string;
    make?: string;
    model?: string;
    year?: number;
    color?: string;
  }) {
    const ownership = await this.prisma.userVehicle.findUnique({
      where: { userId_vehicleId: { userId, vehicleId } },
    });

    if (!ownership) throw new ForbiddenException();

    return this.prisma.vehicle.update({ where: { id: vehicleId }, data });
  }

  async hideVehicle(userId: string, vehicleId: string) {
    const ownership = await this.prisma.userVehicle.findUnique({
      where: { userId_vehicleId: { userId, vehicleId } },
    });

    if (!ownership) throw new ForbiddenException();

    await this.prisma.userVehicle.update({
      where: { userId_vehicleId: { userId, vehicleId } },
      data: { isHidden: true },
    });
  }
}
