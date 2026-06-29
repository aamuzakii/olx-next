import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const arrOfJobs = data;

  console.log(arrOfJobs, "incoming arrOfJobs");

  //   {
  //     "url": "https://www.upwork.com/jobs/Frontend-Developer-Needed-Build-Landing-Page-Using-Tools_~022071531905421129908/",
  //     "title": "Frontend Developer Needed — Build a Landing Page Using AI Tools",
  //     "stack": "[\"Next.js\",\"React\",\"Tailwind CSS\",\"JavaScript\",\"CSS\",\"Landing Page\",\"Web3\",\"UI/UX Prototyping\"]",
  //     "country": "Location India",
  //     "candidates": "Fewer than 5",
  //     "description": "Looking for a frontend developer who uses AI-assisted coding tools (Cursor, v0, Bolt, Antigravity, etc.) to build a clean, modern landing page. Requirements: Build a responsive landing page (React/Next.js preferred) Clean, modern UI — can use Tailwind CSS Sections: Hero, Features, CTA, Footer Should be mobile responsive Please mention which AI tool(s) you used in your proposal",
  //     "date": "5 minutes ago",
  //     "fee": "Fixed price Intermediate Est. budget: $5.00"
  // }

  const prisma = new PrismaClient();

  const results = await Promise.all(
    arrOfJobs.map((job: any) =>
      prisma.job.upsert({
        where: {
          url: job.url,
        },
        create: job,
        update: {
          candidates: job.candidates,
          date: job.date,
        },
      }),
    ),
  );

  await prisma.$disconnect();

  return NextResponse.json({ messsage: results.length });
}
