import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getManyHouses } from "./shell";

export async function GET() {
  const x = await getManyHouses();

  console.log(x);

  const prisma = new PrismaClient();

  const res = await prisma.house.createMany({
    data: x,
    skipDuplicates: true,
  });

  await prisma.$disconnect();

  return NextResponse.json({ data: res });
}
