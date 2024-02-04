import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { maxBudget } from "@/app/helper/general";

export const where = {
  deleted: false || null,
  candidates: "Less than 5" || "5 to 10",
  country: {
    notIn: ["UnitedKingdom", "UnitedStates"],
  },
};

export async function GET() {
  const prisma = new PrismaClient();

  const houses = await prisma.job.findMany({
    where,
    orderBy: {
      id: "asc",
    },
  });
  await prisma.$disconnect();

  return NextResponse.json({ data: houses });
}
