import { NextResponse, NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.warn("start process deleting:", id);

  const prisma = new PrismaClient();

  const deleted = await prisma.job.update({
    where: {
      id,
    },
    data: {
      deleted: true,
    },
  });
  await prisma.$disconnect();

  return NextResponse.json({ data: deleted });
}
