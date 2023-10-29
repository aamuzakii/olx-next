import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  const src =
    "https://apollo-singapore.akamaized.net/v1/files/nmgmli9mrdbh3-ID/image;s=300x600;q=60";
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((x) => (
          <div className={styles.kartu}>
            <Image src={src} alt="" width={215} height={153}></Image>
            <h5 className={styles.harga}>Rp 1.700.000</h5>
            <h5>2 KT - 1 KM - 45 m2</h5>
            <p>KEMARIN</p>
          </div>
        ))}
      </div>
    </main>
  );
}
