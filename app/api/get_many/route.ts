import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getManyHouses } from "./shell";

export async function GET() {
  getManyHouses();

  const prisma = new PrismaClient();

  await prisma.$disconnect();

  return NextResponse.json({ data: 123 });
}
