import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getHousesByCity } from "./shell";
import {
  bogorKab,
  bogorKota,
  depok,
  tangsel,
  tangerangKota,
  bekasiKota,
  cileungsi,
  gunungPutri,
  jatiSampurna,
  cimanggis,
  sukmajaya,
} from "./city";

export async function GET() {
  const preferredCities = [
    cileungsi,
    gunungPutri,
    jatiSampurna,
    cimanggis,
    sukmajaya,
    depok,
    tangsel,
    tangerangKota,
    bekasiKota,
  ];

  const compoundedHouses = [];

  // for (const query of queryList) {
  //   const houses = await getHouseByQuery(query);
  //   compoundedHouses.push(houses);
  // }

  for (const city of preferredCities) {
    const houses = await getHousesByCity(city);
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
