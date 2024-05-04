import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";
// import { where } from "../houses/route";
const where = {}

export async function GET() {
  const prisma = new PrismaClient();

  const houses = await prisma.house.findMany({
    where,
  });

  houses.forEach(async (house, i) => {
    const response = await fetch(house.url);

    if (!response.ok && response.status === 404) {
      const deleted = await prisma.house.update({
        where: {
          id: house.id,
        },
        data: {
          // deleted: true,
          // comment: "404",
        },
      });
      console.info("deleted:", deleted.title);
    }
  });
  await prisma.$disconnect();

  return NextResponse.json({ data: houses });
}
