import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.catalogInquiry.deleteMany();
  await prisma.catalogListing.deleteMany();
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

  // Catalog seed data
  await prisma.catalogListing.createMany({
    data: [
      {
        type: "SALE",
        make: "Toyota",
        model: "Camry",
        year: 2021,
        mileage: 62000,
        price: 890000,
        bargainEnabled: true,
        description:
          "Відмінний стан, один власник. Повна комплектація: шкіряний салон, підігрів сидінь, камера заднього виду. Регулярне ТО у нашому СТО.",
        photos: [
          "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
          "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800",
        ],
        status: "AVAILABLE",
      },
      {
        type: "SALE",
        make: "Volkswagen",
        model: "Passat",
        year: 2019,
        mileage: 98000,
        price: 720000,
        bargainEnabled: true,
        description:
          "Дизельний двигун 2.0 TDI, механічна КПП. Ідеальний варіант для тих, хто багато їздить. Свіжа діагностика, без прихованих дефектів.",
        photos: [
          "https://images.unsplash.com/photo-1617469767399-f9cc89bcfe9a?w=800",
        ],
        status: "AVAILABLE",
      },
      {
        type: "SALE",
        make: "BMW",
        model: "3 Series",
        year: 2020,
        mileage: 45000,
        price: 1150000,
        bargainEnabled: false,
        description:
          "Бензин 2.0, автоматична КПП. Спортивна комплектація M Sport. Ціна остаточна — автомобіль у чудовому стані, торг неможливий.",
        photos: [
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
          "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800",
        ],
        status: "AVAILABLE",
      },
      {
        type: "SALE",
        make: "Kia",
        model: "Sportage",
        year: 2022,
        mileage: 28000,
        price: 980000,
        bargainEnabled: true,
        description:
          "Кросовер у відмінному стані. Повний привід, автоматична КПП. Гарантія від виробника ще діє до 2025 року.",
        photos: [
          "https://images.unsplash.com/photo-1600704842599-c1f3ac75ef9e?w=800",
        ],
        status: "RESERVED",
      },
      {
        type: "WANTED",
        make: "Toyota",
        model: "RAV4",
        year: 2018,
        yearMax: 2022,
        mileage: 50000,
        mileageMax: 130000,
        price: 850000,
        bargainEnabled: false,
        description:
          "Шукаємо Toyota RAV4 2018–2022 у хорошому стані. Привід 4WD або FWD, будь-яка КПП. Бензин або гібрид. Без ДТП та значних кузовних робіт.",
        photos: [],
        status: "AVAILABLE",
      },
      {
        type: "WANTED",
        make: "Skoda",
        model: "Octavia",
        year: 2017,
        yearMax: 2021,
        mileageMax: 150000,
        price: 600000,
        bargainEnabled: false,
        description:
          "Шукаємо Skoda Octavia A7/A8 у будь-якій комплектації. Дизель або бензин. Розглянемо варіанти з пробігом до 150 000 км у хорошому стані.",
        photos: [],
        status: "AVAILABLE",
      },
    ],
  });

  console.log("Seed complete.");
  console.log(`  Registered user: ${user.phone}`);
  console.log(`  Shadow user: ${shadow.phone}`);
  console.log(`  Catalog: 4 SALE listings, 2 WANTED listings`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
