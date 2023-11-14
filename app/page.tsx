"use client";
import Image from "next/image";
import style from "./page.module.css";
import { useEffect, useState } from "react";
import { House } from "@prisma/client";

export default function Home() {
  const [list, setList] = useState<House[]>([]);

  const checkUserLoggedIn = async () => {
    const res = await fetch("http://localhost:3000/api/houses");

    const data = await res.json();
    setList(data.data);
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const handleClickDelete = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/del/${id}`);

    const data = await res.json();
    alert("deleted");
  };
  const handleOpenComment = async (id: number) => {};

  const handleClickRevalidate = async () => {
    const res = await fetch(`http://localhost:3000/api/revalidate`);
    const data = await res.json();
    alert(`revalidated. lost: ${data.data.count}`);
  };

  const handleClickRefetch = async () => {
    const res = await fetch(`http://localhost:3000/api/get_many`);
    const data = await res.json();
    alert(`got ${data.data.count}`);
  };

  return (
    <>
      <nav>
        <button onClick={handleClickRefetch}>Refetch</button>
        <button onClick={handleClickRevalidate}>Revalidate</button>
      </nav>
      <main className={style.main}>
        <div className={style.grid}>
          {list.map((h) => {
            let formattedNumber = "";
            if (h.price) {
              formattedNumber = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(h.price);
            }

            return (
              <div className={style.kartu}>
                <a href={h.url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={h.imageUrl || ""}
                    alt=""
                    width={242}
                    height={153}
                  ></Image>
                  <p className={style.harga}>{formattedNumber}</p>
                  <p className={style.feature}>{h.feature}</p>
                  <p className={style.title}>{h.title}</p>
                  <div className={style.bottom}>
                    <p className={style.published}>
                      {h.publishedStr?.toUpperCase()}
                    </p>
                    <p className={style.published}>
                      {h.prefecture?.toUpperCase()}
                    </p>
                  </div>
                  <hr />
                  <p className={style.title}>{h.comment}</p>
                </a>
                <button
                  onClick={() => handleClickDelete(h.id)}
                  className={style.red}
                >
                  DELETE
                </button>
                <button onClick={() => handleOpenComment(h.id)}>COMMENT</button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
