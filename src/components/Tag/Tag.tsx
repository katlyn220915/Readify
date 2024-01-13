"useClient";

import React from "react";

import styles from "./Tag.module.css";
import Link from "next/link";

export default function Tag({ tag }: { tag: string }) {
  return (
    <button
      className={styles.tag}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Link href={`/search?tag=${tag}`}>{tag}</Link>
    </button>
  );
}
