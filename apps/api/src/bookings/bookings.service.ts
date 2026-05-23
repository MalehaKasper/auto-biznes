import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "../auth/auth.service";
import { SmsQueue } from "../sms/sms.queue";

export interface CreateBookingInput {
  phone: string;
  name: string;
  serviceType: "STO" | "TIRE";
  scheduledAt?: string;
  notes?: string;
  plate?: string;
  vin?: string;
  make?: string;
  model?: string;
  year?: number;
  color?: string;
}

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly smsQueue: SmsQueue
  ) {}

  async create(input: CreateBookingInput) {
    const user = await this.authService.upsertUser(input.phone);

    if (user.status === "SHADOW" && input.name && !user.name) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: { name: input.name },
      });
    }

    const vehicle = await this.prisma.vehicle.create({
      data: {
        plate: input.plate ?? null,
        vin: input.vin ?? null,
        make: input.make ?? null,
        model: input.model ?? null,
        year: input.year ?? null,
        color: input.color ?? null,
      },
    });

    await this.prisma.userVehicle.upsert({
      where: { userId_vehicleId: { userId: user.id, vehicleId: vehicle.id } },
      create: { userId: user.id, vehicleId: vehicle.id },
      update: {},
    });

    const booking = await this.prisma.booking.create({
      data: {
        userId: user.id,
        vehicleId: vehicle.id,
        serviceType: input.serviceType,
        scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : null,
        notes: input.notes,
      },
    });

    await this.smsQueue.sendBookingConfirmation(
      input.phone,
      booking.id,
      input.serviceType,
      booking.scheduledAt ?? undefined
    );

    return { bookingId: booking.id, status: booking.status };
  }

  async getStatus(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      select: {
        status: true,
        serviceType: true,
        scheduledAt: true,
        vehicle: { select: { plate: true } },
      },
    });

    if (!booking) return null;

    return {
      status: booking.status,
      serviceType: booking.serviceType,
      scheduledAt: booking.scheduledAt,
      vehiclePlate: booking.vehicle.plate,
    };
  }

  async getSlots(serviceType: string, date: string) {
    const dayStart = new Date(date);
    dayStart.setHours(8, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(18, 0, 0, 0);

    const booked = await this.prisma.booking.findMany({
      where: {
        serviceType: serviceType as "STO" | "TIRE",
        scheduledAt: { gte: dayStart, lte: dayEnd },
        status: { notIn: ["CANCELLED"] },
      },
      select: { scheduledAt: true },
    });

    const bookedTimes = new Set(
      booked.map((b) => b.scheduledAt?.toISOString())
    );

    const slots: string[] = [];
    for (let hour = 8; hour < 18; hour++) {
      for (const min of [0, 30]) {
        const slot = new Date(date);
        slot.setHours(hour, min, 0, 0);
        if (!bookedTimes.has(slot.toISOString())) {
          slots.push(slot.toISOString());
        }
      }
    }

    return slots;
  }

  private static VALID_TRANSITIONS: Record<string, string[]> = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["IN_PROGRESS", "CANCELLED"],
    IN_PROGRESS: ["COMPLETED", "CANCELLED"],
    COMPLETED: [],
    CANCELLED: [],
  };

  async updateStatus(id: string, status: string, notes?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { user: { select: { phone: true } } },
    });

    if (!booking) throw new NotFoundException(`Booking ${id} not found`);

    const allowed = BookingsService.VALID_TRANSITIONS[booking.status] ?? [];
    if (!allowed.includes(status)) {
      throw new BadRequestException(
        `Invalid status transition: ${booking.status} → ${status}`
      );
    }

    const updated = await this.prisma.booking.update({
      where: { id },
      data: { status: status as any, notes: notes ?? booking.notes },
    });

    const phone = booking.user.phone;
    if (status === "CONFIRMED" && booking.scheduledAt) {
      await this.smsQueue.sendBookingConfirmed(phone, id, booking.scheduledAt);
    } else if (status === "CANCELLED") {
      await this.smsQueue.sendBookingCancelled(phone, notes);
    }

    return { id: updated.id, status: updated.status };
  }
}
