const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const arrOfJobs: any[] = [
  // your job objects here
];

const upsertJobs = async () => {
  for (const job of arrOfJobs) {
    try {
      await prisma.job.upsert({
        where: {
          /* define the unique criteria for your job, usually an ID or unique constraint */
        },
        update: {
          /* the data you want to update if the record already exists */
        },
        create: job, // the data you want to insert if the record doesn't exist
      });
    } catch (error: any) {
      console.error(`Error upserting job: ${error.message}`);
    }
  }
};

upsertJobs()
  .catch((error) => console.error(`Error: ${error}`))
  .finally(async () => {
    await prisma.$disconnect();
  });
