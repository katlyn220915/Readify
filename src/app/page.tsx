import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.banner}>
        <h2 className={styles.slogan}>
          Where Books Come to Life at Your Fingertips
        </h2>
        <div className={styles.descriptions}>
          <h3 className={styles.description}>
            Read and take notes simultaneously -{" "}
          </h3>
          <h3 className={styles.description}>
            Readify helps you remeber what the books say
          </h3>
        </div>
      </div>
    </main>
  );
}
