import style from "./page.module.css";
import { countries } from "./country";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

interface Job {
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

const applicationFilter = ["Less than 5", "5 to 10", "10 to 15"];
const _otherCountry = ["United Kingdom", "United States"];

async function getJobs() {
  const prisma = new PrismaClient();

  const where = {
    deleted: false || null,
    candidates: {
      in: applicationFilter,
    },
    country: {
      notIn: ["India", "Israel"],
    },
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { id: "asc" },
  });

  const total = await prisma.job.count({ where });

  await prisma.$disconnect();
  return { jobs, total };
}

async function deleteJob(formData: FormData) {
  "use server";

  const prisma = new PrismaClient();
  const id = formData.get("id");

  await prisma.job.update({
    where: { id: Number(id) },
    data: { deleted: true },
  });

  await prisma.$disconnect();
  revalidatePath("/jobs");
}

const JobsPage = async () => {
  const { jobs, total } = await getJobs();

  return (
    <main className={style.main}>
      <p className={style.summary}>
        Showing {jobs.length} of {total} jobs
        <br />
        {applicationFilter.join(", ")}
      </p>
      <div className={style.grid}>
        {jobs.map((job) => {
          const stacks: string[] = JSON.parse(job.stack || "[]");

          return (
            <div className={style.card} key={job.id}>
              <div className={style.meta}>
                <time>{job.date}</time>
                <span>{job.fee}</span>
              </div>

              <h4 className={style.title}>
                {job.id}. {job.title}
              </h4>

              {stacks.length > 0 && (
                <ul className={style.stackList}>
                  {stacks.map((s, i) => (
                    <li key={i} className={style.stackItem}>
                      {s}
                    </li>
                  ))}
                </ul>
              )}

              <div className={style.footer}>
                <div className={style.location}>
                  <span className={style.flag}>
                    {countries[job.country || ""]?.flag}
                  </span>
                  <span>{job.country}</span>
                </div>
                <span className={style.proposals}>
                  Proposals: {job.candidates}
                </span>
              </div>

              <div className={style.interaction}>
                <a href={job.url} target="_blank" className={style.link}>
                  View job &rarr;
                </a>
                <form action={deleteJob}>
                  <input type="hidden" name="id" value={job.id} />
                  <button type="submit" className={style.deleteBtn}>
                    Delete
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default JobsPage;
