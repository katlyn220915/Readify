import React from "react";

import Image from "next/image";
import Link from "next/link";

import styles from "./logo.module.css";

export default function Logo({ showText }: { showText: boolean }) {
  return (
    <h1 className={styles.logo}>
      <Link href="/">
        <Image
          src="/image/logo.jpg"
          alt="logo-readify"
          width={50}
          height={50}
          priority={false}
        />
        {showText && <span>Readify</span>}
      </Link>
    </h1>
  );
}
