import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  let passedValue = await new Response(request.body).text();
  let { standard } = JSON.parse(passedValue);

  // const requestBody = await request.json(); // Parse JSON from the request body

  const prisma = new PrismaClient();

  const updatedHouse = await prisma.house.update({
    where: {
      id,
    },
    data: {
      standard, // Assuming the comment is in the request body
    },
  });

  await prisma.$disconnect();

  return NextResponse.json({ data: 1 });
}
