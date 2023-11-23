import React from "react";
import Logo from "../Logo/Logo";
import style from "./navbar.module.css";
import ButtonCta from "../ButtonCta/ButtonCta";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={style.navigation}>
      <Logo />
      <ButtonCta color="blue">
        <Link href="./signin">Sign in</Link>
      </ButtonCta>
    </nav>
  );
}
