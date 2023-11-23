import React from "react";
import Link from "next/link";
import styles from "./ButtonCta.module.css";
import ButtonCtaProps from "@/types/ButtonCtaProps";

export default function ButtonCta({ path, children }: ButtonCtaProps) {
  return (
    <div className={styles.btn}>
      <Link href={path}>{children}</Link>
    </div>
  );
}
