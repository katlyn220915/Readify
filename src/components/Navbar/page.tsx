import React from "react";
import Logo from "../Logo/Logo";
import style from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={style.navigation}>
      <Logo />
      <button className={`btn ${style.btn_signin}`}>Sign in</button>
    </nav>
  );
}
