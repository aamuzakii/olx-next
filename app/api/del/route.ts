import { NextResponse, NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function GET(request: NextRequest) {
  const prisma = new PrismaClient();

  const deleted = await prisma.house.update({
    where: {
      id: 145,
    },
    data: {
      deleted: true,
    },
  });
  await prisma.$disconnect();

  return NextResponse.json({ data: deleted });
}
