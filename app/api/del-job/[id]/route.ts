import { NextResponse, NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  console.warn("process deleting:", id);

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

  return NextResponse.json({ data: deleted.title });
}
