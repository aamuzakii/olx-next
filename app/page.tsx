"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

type House = {
  id: number;
  url: string;
  price: number | null;
  published: Date | null;
  publishedStr: string | null;
  imageUrl: string | null;
  deleted: boolean | null;
  title?: string;
  feature?: string;
};

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

  console.log(list);

  const handleClickDelete = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/del/${id}`);

    const data = await res.json();
    alert("deleted");
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
      </nav>
      <main className={styles.main}>
        <div className={styles.grid}>
          {list.map((h) => {
            let formattedNumber = "";
            if (h.price) {
              formattedNumber = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(h.price);
            }

            return (
              <div className={styles.kartu}>
                <a href={h.url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={h.imageUrl || ""}
                    alt=""
                    width={242}
                    height={153}
                  ></Image>
                  <p className={styles.harga}>{formattedNumber}</p>
                  <p className={styles.feature}>{h.feature}</p>
                  <p className={styles.title}>{h.title}</p>
                  <p className={styles.published}>{h.publishedStr}</p>
                </a>
                <button onClick={() => handleClickDelete(h.id)}>DELETE</button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
