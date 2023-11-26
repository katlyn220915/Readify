import React from "react";
import styles from "./ButtonNormal.module.css";

export default function ButtonNormal({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button className={styles.btn} onClick={onClick}>
      {children}
    </button>
  );
}
