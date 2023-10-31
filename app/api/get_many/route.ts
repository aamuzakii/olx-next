import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getManyHouses } from "./shell";
import { bekasiKota, bogorKab, bogorKota, depok } from "./city";

export async function GET() {
  const preferredCities = [bekasiKota];

  const compoundedHouses = await Promise.all(
    preferredCities.map(async (city) => {
      const houses = await getManyHouses(city);
      return houses;
    })
  );

  const flattenedHouses = compoundedHouses.flat();

  const prisma = new PrismaClient();

  const res = await prisma.house.createMany({
    data: flattenedHouses,
    skipDuplicates: true,
  });

  await prisma.$disconnect();

  return NextResponse.json({ data: res });
}
