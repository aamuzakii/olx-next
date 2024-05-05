import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

export async function GET() {


  return NextResponse.json({ data: 1 });
}
