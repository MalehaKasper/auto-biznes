import { PrismaClient } from "../src/generated/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.serviceRecord.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.userVehicle.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.otpCode.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      phone: "+380991234567",
      name: "Іван Тест",
      email: "ivan@test.com",
      status: "REGISTERED",
    },
  });

  const shadow = await prisma.user.create({
    data: { phone: "+380997654321", status: "SHADOW" },
  });

  const camry = await prisma.vehicle.create({
    data: {
      plate: "AA1234BB",
      make: "Toyota",
      model: "Camry",
      year: 2020,
      color: "Чорний",
      vin: "1HGBH41JXMN109186",
    },
  });

  const civic = await prisma.vehicle.create({
    data: {
      plate: "BC5678CD",
      make: "Honda",
      model: "Civic",
      year: 2018,
      color: "Сірий",
    },
  });

  const emptyVehicle = await prisma.vehicle.create({ data: {} });

  await prisma.userVehicle.createMany({
    data: [
      { userId: user.id, vehicleId: camry.id },
      { userId: user.id, vehicleId: civic.id, isHidden: true },
      { userId: shadow.id, vehicleId: emptyVehicle.id },
    ],
  });

  await prisma.booking.create({
    data: {
      userId: user.id,
      vehicleId: camry.id,
      serviceType: "STO",
      status: "CONFIRMED",
      scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      notes: "Заміна масла + перевірка гальм",
    },
  });

  await prisma.serviceRecord.createMany({
    data: [
      {
        vehicleId: camry.id,
        ownerUserId: user.id,
        ownerType: "CLIENT",
        serviceType: "Заміна масла",
        description: "Замінено моторне масло 5W-30, масляний фільтр",
        mileage: 85000,
        cost: 1200,
        performedAt: new Date("2026-03-15"),
      },
      {
        vehicleId: camry.id,
        ownerUserId: user.id,
        ownerType: "CLIENT",
        serviceType: "Шиномонтаж",
        description: "Перевзування на літню гуму Michelin",
        mileage: 87500,
        cost: 800,
        performedAt: new Date("2026-04-10"),
      },
    ],
  });

  console.log("Seed complete.");
  console.log(`  Registered user: ${user.phone}`);
  console.log(`  Shadow user: ${shadow.phone}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
