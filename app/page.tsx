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
  };

  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {list.map((h) => (
          <a href={h.url} target="_blank" rel="noopener noreferrer">
            <div className={styles.kartu}>
              <Image
                src={h.imageUrl || ""}
                alt=""
                width={215}
                height={153}
              ></Image>
              <h5 className={styles.harga}>Rp {h.price}</h5>
              <h5>2 KT - 1 KM - 45 m2</h5>
              <p>{h.publishedStr}</p>
              <button onClick={() => handleClickDelete(h.id)}>DELETE</button>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
