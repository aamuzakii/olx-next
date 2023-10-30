import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const command =
  'curl -o list.txt "https://www.olx.co.id/depok-kota_g4000024/disewakan-rumah-apartemen_c5160?filter=price_between_1700000_to_2000000,type_eq_rumah"';

export async function GET() {
  async function runCommand() {
    try {
      const { stdout, stderr } = await exec(command);
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    } catch (error: any) {
      console.error(`error: ${error.message}`);
    }
  }

  runCommand();

  const prisma = new PrismaClient();

  await prisma.$disconnect();

  return NextResponse.json({ data: 123 });
}
