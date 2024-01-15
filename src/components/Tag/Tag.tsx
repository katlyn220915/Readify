"useClient";

import React from "react";

import styles from "./Tag.module.css";
import Link from "next/link";
import TagProps from "@/types/TagProps";
import { useAppSelector } from "@/hooks/redux/hooks";

export default function Tag({ tag }: { tag: TagProps }) {
  return (
    <button
      className={styles.tag}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Link href={`/search?tag=${tag.name}`}>{tag.name}</Link>
    </button>
  );
}
