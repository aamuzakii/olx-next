"use client";
import Image from "next/image";
import style from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { House } from "@prisma/client";
import Card from "./card";

export default function Home() {
  const [list, setList] = useState<House[]>([]);

  const refreshList = async () => {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/houses`);

    const data = await res.json();
    setList(data.data);
  };

  const exampleRef = useRef(null);

  useEffect(() => {
    refreshList();
  }, []);

  const handleClickDelete = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/del/${id}`);
    const data = await res.json();
    await refreshList();
  };

  const handleClickJustNotPerfect = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/houses/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ standard: "not - high" }),
    });

    await refreshList();

    // const data = await res.json();
    // alert("deleted");
  };

  const handleClickRevalidate = async () => {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/revalidate`);
    const data = await res.json();
    alert(`revalidated. lost: ${data.data.count}`);
  };

  const handleClickRefetch = async () => {
    const res = await fetch(`${process.env.NEXT_API_URL}/api/get_many`);
    const data = await res.json();
    await refreshList();
    alert(`got ${data.data.count}`);
  };

  const [comment, setComment] = useState("");

  const submitComment = async (e: any, id: number) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_API_URL}/api/add_comment/${id}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      }
    );
    // const x = document.getElementsByTagName("form")[id];
    // x.style.display = "none";
    setComment("");
    await refreshList();
  };

  return (
    <>
      <nav>
        <button onClick={handleClickRefetch}>Refetch</button>
        <button onClick={handleClickRevalidate}>Revalidate</button>
      </nav>
      <section>
        <ul>
          <li>
            Jarak max 23.3km ke Aruna ataupun Alodokter. Jangan lebih, karena
            kalo WFO lu beneran tiap hari PP
          </li>
          <li>
            Kereta itu no karena kereta harus lanjut gojek which is minimal 15k.
            Belum parkir di stasiun yg juga harganya mirip parkir di aruna{" "}
          </li>
          <li>
            TK serius max 5km, itu ke fore udah cape cuy. Bahkan kalau bisa 3 km
          </li>
          <li>Banjir paling cek nya last ya</li>
        </ul>
      </section>
      <main className={style.main}>
        <div className={style.grid}>
          {list.map((h, i) => {
            let formattedNumber = "";
            if (h.price) {
              formattedNumber = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(h.price);
            }

            return (
              <Card
                h={h}
                refreshList={refreshList}
                formattedNumber={formattedNumber}
                i={i}
                key={h.id}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
