"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "./page.module.css";
import Card from "../card";
import Trash from "../atom/Trash";
import Chevron from "../atom/Chevron";
import { countries } from "./country";

interface IJob {
  id: number;
  url: string;
  title: string;
  stack: string;
  country: string;
  candidates: string;
  description: string;
  date: string;
  fee: string;
}

const page = () => {
  interface IFoo {
    price: string;
  }

  const [list, setList] = useState<IJob[]>([]);

  const nextApiUrl = process.env.NEXT_API_URL || "";

  const refreshList = async () => {
    console.log("nextApiUrl", nextApiUrl);

    const res = await fetch(`${nextApiUrl}/api/jobs`);

    const data = await res.json();
    setList(data.data);
  };

  const fetchNew = async () => {
    const res = await fetch(`${nextApiUrl}/api/fetch-jobs`);

    const data = await res.json();
    setList(data.data);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const handleClickDelete = async (id: number) => {
    const res = await fetch(`/api/del-job/${id}`);
    const data = await res.json();
    await refreshList();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  return (
    <>
      <nav>
        <button
          onClick={() => {
            fetchNew();
          }}
        >
          Refetch
        </button>
        <button onClick={() => {}}>Revalidate</button>
      </nav>
      <dialog open={isOpen} onClose={closeDialog}>
        <h2>Dialog Title</h2>
        <p>{dialogText}</p>
        <button onClick={closeDialog}>Close</button>
      </dialog>
      <main className={style.main}>
        <div className={style.grid}>
          {list.map((h, i) => {
            let formattedNumber = "";

            const stacks = JSON.parse(h.stack);
            return (
              <div className={style.card} key={h.id}>
                <p>{h.date}</p>
                <p>{h.fee}</p>
                <h4 className={style.title}>{h.title}</h4>
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
                  {countries[h.country]?.flag}
                </div>
                <p>Proposals: {h.candidates}</p>
                <div className={style.interaction}>
                  <button onClick={() => handleClickDelete(h.id)}>
                    <Trash />
                  </button>

                  <button
                    onClick={() => {
                      openDialog();
                      setDialogText(h.description);
                    }}
                  >
                    Open Dialog
                  </button>
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
