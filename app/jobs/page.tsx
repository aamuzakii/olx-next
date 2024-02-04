"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "../page.module.css";
import Card from "../card";

const page = () => {
  interface IFoo {
    price: string;
  }

  const [list, setList] = useState([]);

  const checkUserLoggedIn = async () => {
    const res = await fetch("http://localhost:3000/api/jobs");

    const data = await res.json();
    setList(data.data);
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);
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
          {[].map((h, i) => {
            let formattedNumber = "";
            return <h1></h1>;
          })}
        </div>
      </main>
    </>
  );
};

export default page;
