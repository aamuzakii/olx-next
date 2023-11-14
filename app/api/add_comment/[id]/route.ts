import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  let passedValue = await new Response(request.body).text();
  let valueToJson = JSON.parse(passedValue);

  const prisma = new PrismaClient();

  const updatedHouse = await prisma.house.update({
    where: {
      id,
    },
    data: {
      comment: valueToJson.comment, // Assuming the comment is in the request body
    },
  });

  await prisma.$disconnect();

  return NextResponse.json({ data: updatedHouse.color });
}
