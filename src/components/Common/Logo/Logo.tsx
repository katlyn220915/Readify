import React from "react";
import styles from "./logo.module.css";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <h1 className={styles.logo}>
      <Link href="/">
        <Image
          src="/image/logo.png"
          alt="logo-readify"
          width={60}
          height={60}
          priority={false}
        />
        <span>Readify</span>
      </Link>
    </h1>
  );
}
