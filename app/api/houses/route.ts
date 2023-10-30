import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();

  const houses = await prisma.house.findMany();
  await prisma.$disconnect();

  return NextResponse.json({ data: houses });
}
