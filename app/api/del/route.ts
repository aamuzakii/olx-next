import { NextResponse, NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function GET(request: NextRequest) {
  const {} = request;
  const prisma = new PrismaClient();

  const houses = await prisma.house.delete({
    where: {
      id: 1,
    },
  });
  await prisma.$disconnect();

  return NextResponse.json({ data: body });
}
