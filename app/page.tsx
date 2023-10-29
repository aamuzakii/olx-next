import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {[1, 1, 1, 1, 1, 1].map((x) => (
          <div className={styles.kartu}>
            <Image
              src="https://apollo-singapore.akamaized.net/v1/files/akka05nkztsf2-ID/image"
              alt=""
              width={215}
              height={153}
            ></Image>
          </div>
        ))}
      </div>
    </main>
  );
}
