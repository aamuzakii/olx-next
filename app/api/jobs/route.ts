import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const where = {
  deleted: false || null,
  candidates:
  {
    in: ["Less than 5", "5 to 10", "10 to 15"]
  },
  country: {
    notIn: ["India", "Israel", "United Kingdom", "United States"],
  },
};

export async function GET() {
  const prisma = new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  })

  prisma.$on('query', (e) => {
    console.log('Query: ' + e.query)
    console.log('Params: ' + e.params)
    console.log('Duration: ' + e.duration + 'ms')
  })

  const houses = await prisma.job.findMany({
    where,
    orderBy: {
      id: "asc",
    },
  });
  await prisma.$disconnect();

  return NextResponse.json({ data: houses });
}
