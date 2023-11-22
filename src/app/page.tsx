import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Link href="/mylibrary">MyLibrary</Link>
    </main>
  );
}
