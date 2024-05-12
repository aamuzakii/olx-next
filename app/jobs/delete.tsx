"use client";

import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { useFormStatus, useFormState } from "react-dom";

export async function deleteTodo(prevState: any, formData: FormData) {
  // const schema = z.object({
  //   id: z.number(),
  // });

  // const data = schema.parse({
  //   id: formData.get("id"),
  // });

  const mama = formData.get("id");

  try {
    const prisma = new PrismaClient({
      log: [
        {
          emit: "event",
          level: "query",
        },
        {
          emit: "stdout",
          level: "error",
        },
        {
          emit: "stdout",
          level: "info",
        },
        {
          emit: "stdout",
          level: "warn",
        },
      ],
    });

    prisma.$on("query", (e) => {
      console.log("Query: " + e.query);
      // console.log("Params: " + e.params);
      // console.log("Duration: " + e.duration + "ms");
    });

    const deleted = await prisma.job.update({
      where: {
        id: Number(mama),
      },
      data: {
        deleted: true,
      },
    });

    await prisma.$disconnect();
    revalidatePath("/jobs");
    return { message: "ok" };
  } catch (error) {}
}

const initialState = {
  message: "null",
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return <button type="submit">Delete</button>;
}

export function DeleteForm({ id }: { id: number }) {
  const [state, formAction] = useFormState(deleteTodo, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
      <p aria-live="polite" role="status">
        {state?.message}
      </p>
    </form>
  );
}
