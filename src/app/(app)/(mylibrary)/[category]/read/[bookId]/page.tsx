import React from "react";
import styles from "./page.module.css";
import ReadingArea from "@/components/ReadingArea/ReadingArea";
import BookContent from "@/components/BookContent/BookContent";

export default function BookId() {
  return (
    <div className={styles.container}>
      <BookContent />
      <ReadingArea />
    </div>
  );
}
