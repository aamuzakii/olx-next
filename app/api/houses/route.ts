import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { maxBudget } from "@/app/helper/general";

export async function GET() {
  const prisma = new PrismaClient();

  const where = {
    deleted: false,
    price: {
      lte: maxBudget,
    },
    standard: {
      equals: null,
    },
  };

  const houses = await prisma.house.findMany({
    where,
  });
  await prisma.$disconnect();

  return NextResponse.json({ data: houses });
}
