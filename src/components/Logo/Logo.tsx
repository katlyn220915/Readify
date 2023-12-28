import React from "react";
import Image from "next/image";

import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/image/Readify-new.png"
        alt="readify"
        width={100}
        height={100}
        priority={false}
      />
    </Link>
  );
}
