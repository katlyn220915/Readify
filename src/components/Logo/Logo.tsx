import React from "react";
import Image from "next/image";

import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/image/logo-light.png"
        alt="readify"
        width={120}
        height={100}
      />
    </Link>
  );
}
