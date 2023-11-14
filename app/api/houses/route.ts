import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { maxBudget } from "@/app/helper/general";

export async function GET() {
  const prisma = new PrismaClient();

  const houses = await prisma.house.findMany({
    where: {
      deleted: false,
      price: {
        lte: maxBudget,
      },
      standard: {
        equals: null,
      },
    },
  });
  await prisma.$disconnect();

  return NextResponse.json({ data: houses });
}
