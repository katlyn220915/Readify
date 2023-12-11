import React from "react";
import styles from "./page.module.css";
import ReadingArea from "@/components/ReadingArea/ReadingArea";

export default function BookId() {
  return (
    <div className={styles.container}>
      <ReadingArea />
    </div>
  );
}
