import React from "react";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
}
