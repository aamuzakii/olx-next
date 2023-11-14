import { NextResponse, NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  const prisma = new PrismaClient();

  console.log(id);

  // const updatedHouse = await prisma.house.update({
  //   where: {
  //     id,
  //   },
  //   data: {
  //     deleted: true,
  //   },
  // });

  await prisma.$disconnect();

  return NextResponse.json({ data: 1 });
}
