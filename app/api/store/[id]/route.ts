import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log(params);

  return NextResponse.json({ messsage: params.id });
}
