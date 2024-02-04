import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { maxBudget } from "@/app/helper/general";

export const where = {
  deleted: false,
  price: {
    lte: maxBudget,
  },
  // prefecture: "Cilodong, Depok Kota",
  standard: {
    equals: null,
  },
};

export async function GET() {
  const prisma = new PrismaClient();

  const houses = await prisma.house.findMany({
    where,
    orderBy: {
      id: "asc",
    },
  });
  await prisma.$disconnect();

  return NextResponse.json({ data: houses });
}
