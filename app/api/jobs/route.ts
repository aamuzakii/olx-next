import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";

export async function GET() {
  const prisma = new PrismaClient();

  console.log(123);

  const jsdom = require("jsdom");
  const fs = require("fs");
  const { JSDOM } = jsdom;

  const file = fs.readFileSync("example.html", "utf-8");
  const dom = new JSDOM(file);
  const jobTileListElement = dom.window.document.querySelector(
    '[data-test="job-tile-list"]'
  );

  const arrOfJobs: any[] = [];

  Array.from(jobTileListElement.children).forEach((section: any, i) => {
    const title = section.children[0];
    const content = section.children[1];

    const fee = content.children[0];
    const desc =
      content.children[1].children[0].children[0].children[0].textContent.replace(
        /\s+/g,
        " "
      );
    const fofo = content.children[2].children;

    const skill = fofo[0].children[0].children[2].children;

    const skillCollection: string[] = [];

    Array.from(skill).forEach((element: any) => {
      console.log(element.textContent);
      skillCollection.push(element.textContent);
    });

    const beforelowest = content.children[3];
    const lowest = content.children[4];

    const applier = lowest.children[0].children[1].innerHTML;

    let country = beforelowest.children[3].textContent;

    country = country.replace(/\s/g, "");

    const newData = {
      url: desc,
      stack: JSON.stringify(skillCollection),
      country,
      candidates: applier,
    };

    arrOfJobs.push(newData);
  });

  const jobs = await prisma.job.createMany({
    data: arrOfJobs,
    skipDuplicates: true,
  });

  await prisma.$disconnect();

  return NextResponse.json({ data: jobs });
}
