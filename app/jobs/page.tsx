import React from "react";
import style from "./page.module.css";
import Card from "../card";
import Trash from "../atom/Trash";
import Chevron from "../atom/Chevron";
import { countries } from "./country";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

interface IJob {
  id: number;
  url: string;
  title: string;
  stack: string | null;
  country: string | null;
  candidates: string | null;
  description: string | null;
  date: string | null;
  fee: string | null;
}

const nextApiUrl = process.env.NEXT_API_URL || "";

async function getJobDataNext13() {
  // const res = await fetch(`/api/jobs`, { cache: "no-store" });

  // const data = await res.json();

  const api = await import("../api/jobs/route");
  // const foo = await (await res.handler()).json();

  const where = {
    deleted: false || null,
    candidates: {
      in: ["Less than 5", "5 to 10", "10 to 15"],
    },
    country: {
      notIn: ["India", "Israel", "United Kingdom", "United States"],
    },
  };

  const prisma = new PrismaClient();

  const houses = await prisma.job.findMany({
    where,
    orderBy: {
      id: "asc",
    },
  });
  await prisma.$disconnect();

  return houses;
}

const page = async () => {
  interface IFoo {
    price: string;
  }

  const handleClickDelete = async (id: number) => {
    // const res = await fetch(`/api/del-job/${id}`, {
    //   cache: "no-store",
    // });
    // const data: IJob[] = await res.json();
  };

  const list: IJob[] = await getJobDataNext13();

  // const [isOpen, setIsOpen] = useState(false);
  // const [dialogText, setDialogText] = useState("");

  // const openDialog = () => setIsOpen(true);
  // const closeDialog = () => setIsOpen(false);

  console.log("list", list);

  return (
    <>
      <main className={style.main}>
        <div className={style.grid}>
          {list.map((h) => {
            let formattedNumber = "";

            const stacks = JSON.parse(h.stack || "");
            return (
              <div className={style.card} key={h.id}>
                <p>{h.date}</p>
                <p>{h.fee}</p>
                <h4 className={style.title}>
                  {h.id}. {h.title}
                </h4>
                {/* <p>{h.description}</p> */}
                <ul>
                  {stacks.map((s: string, i: number) => {
                    return <li key={i}>{s}</li>;
                  })}
                </ul>
                <p>{h.country}</p>
                <div
                  style={{
                    padding: 10,
                    background: "white",
                    fontSize: 30,
                    width: 40,
                  }}
                >
                  {countries[h.country || ""]?.flag}
                </div>
                <p>Proposals: {h.candidates}</p>
                <div className={style.interaction}>
                  <div className={style.wide}></div>

                  <a href={h.url} target="_blank">
                    <Chevron />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default page;
