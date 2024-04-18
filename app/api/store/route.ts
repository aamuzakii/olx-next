import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest) {
  const data = await req.json();
  console.log(data);
  const arrOfJobs = data


  const prisma = new PrismaClient();

  const jobs = await prisma.job.createMany({
    data: arrOfJobs,
    skipDuplicates: true,
  });

  await prisma.$disconnect();

  return 1
}
