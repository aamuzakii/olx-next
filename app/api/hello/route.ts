import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();

  const user = await prisma.house.findFirst();
  await prisma.$disconnect();

  return NextResponse.json({ data: user });
}
