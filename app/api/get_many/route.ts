import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getManyHouses } from "./shell";

export async function GET() {
  const houses = await getManyHouses();

  const prisma = new PrismaClient();

  const res = await prisma.house.createMany({
    data: houses,
    skipDuplicates: true,
  });

  await prisma.$disconnect();

  return NextResponse.json({ data: res });
}
