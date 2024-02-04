"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "./page.module.css";
import Card from "../card";

interface IJob {
  id: number;
  url: string;
  title: string;
  stack: string;
  country: string;
  candidates: string;
  description: string;
  date: string;
}

const page = () => {
  interface IFoo {
    price: string;
  }

  const [list, setList] = useState<IJob[]>([]);

  const checkUserLoggedIn = async () => {
    const res = await fetch("http://localhost:3000/api/jobs");

    const data = await res.json();
    setList(data.data);
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const handleClickDelete = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/del-job/${id}`);
    const data = await res.json();
    await checkUserLoggedIn();
  };
  return (
    <>
      <nav>
        <button onClick={() => {}}>Refetch</button>
        <button onClick={() => {}}>Revalidate</button>
      </nav>
      <section>
        <ul>
          <li>
            Jarak max 23.3km ke Aruna ataupun Alodokter. Jangan lebih, karena
            kalo WFO lu beneran tiap hari PP
          </li>
          <li>Banjir paling cek nya last ya</li>
        </ul>
      </section>
      <main className={style.main}>
        <div className={style.grid}>
          {list.map((h, i) => {
            let formattedNumber = "";

            const stacks = JSON.parse(h.stack);
            return (
              <div className={style.card} key={h.id}>
                <p>{h.date}</p>
                <h4 className={style.title}>{h.title}</h4>
                {/* <p>{h.description}</p> */}
                <ul>
                  {stacks.map((s: string, i: number) => {
                    return <li key={i}>{s}</li>;
                  })}
                </ul>
                <p>{h.country}</p>
                <p>Proposals: {h.candidates}</p>
                <button onClick={() => handleClickDelete(h.id)}>DELETE</button>
                <a href={h.url}>DETAIL</a>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default page;
