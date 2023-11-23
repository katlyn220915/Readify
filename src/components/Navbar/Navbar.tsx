import React from "react";
import Logo from "../Logo/Logo";
import style from "./navbar.module.css";
import ButtonCta from "../ButtonCta/ButtonCta";

export default function Navbar() {
  return (
    <nav className={style.navigation}>
      <Logo />
      <ButtonCta path="/signin">Sign in</ButtonCta>
    </nav>
  );
}
