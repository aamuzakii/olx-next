import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";

export async function GET() {
  const prisma = new PrismaClient();

  const houses = await prisma.house.updateMany({
    where: {
      comment: "404",
    },
    data: {
      comment: "",
    },
  });

  await prisma.$disconnect();

  return NextResponse.json({ data: houses });
}
