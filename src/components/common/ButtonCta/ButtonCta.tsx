import React from "react";

import ButtonCtaProps from "@/types/ButtonCtaProps";

import styles from "./ButtonCta.module.css";

export default function ButtonCta({ children, color }: ButtonCtaProps) {
  return (
    <div
      className={`btn__form ${styles.btn} ${
        color === "blue" && styles.btn_blue
      } ${color === "green" && styles.btn_green}`}
      data-custombtn
    >
      <button>{children}</button>
    </div>
  );
}
