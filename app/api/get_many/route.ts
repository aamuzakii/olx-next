import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const { exec } = require("child_process");

const command =
  'curl -o list.txt "https://www.olx.co.id/depok-kota_g4000024/disewakan-rumah-apartemen_c5160?filter=price_between_1700000_to_2000000,type_eq_rumah"';

export async function GET() {
  exec(command, (error: any, stdout: any, stderr: any) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  const prisma = new PrismaClient();

  const user = await prisma.house.findFirst();
  await prisma.$disconnect();

  return NextResponse.json({ data: 123 });
}
