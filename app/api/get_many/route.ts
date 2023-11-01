import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getManyHouses } from "./shell";
import { bekasiKota, bogorKab, bogorKota, depok } from "./city";

export async function GET() {
  const preferredCities = [depok, bogorKab];

  const compoundedHouses = [];

  for (const city of preferredCities) {
    const houses = await getManyHouses(city);
    compoundedHouses.push(houses);
  }

  const flattenedHouses = compoundedHouses.flat();

  const prisma = new PrismaClient();

  const res = await prisma.house.createMany({
    data: flattenedHouses,
    skipDuplicates: true,
  });

  await prisma.$disconnect();

  return NextResponse.json({ data: res });
}
