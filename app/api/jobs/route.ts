import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const where = {
  deleted: false, // mongoDB cannot receive null as boolean value
  candidates:
  {
    in: ["Less than 5", "5 to 10", "10 to 15"]
  },
  country: {
    notIn: ["India", "Israel", "United Kingdom", "United States"],
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
