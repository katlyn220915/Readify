import React, { ReactElement } from "react";
import styles from "./Menu.module.css";

export default function Menu({ children }: { children: ReactElement }) {
  return (
    <div
      className={styles.manageTags_field}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
}
