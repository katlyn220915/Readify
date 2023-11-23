import React from "react";
import Image from "next/image";

import Link from "next/link";
import LogoProps from "@/types/LogoProps";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/image/logo-light.png"
        alt="readify"
        width={100}
        height={80}
      />
    </Link>
  );
}
