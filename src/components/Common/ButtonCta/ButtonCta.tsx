import React from "react";
import styles from "./ButtonCta.module.css";
import ButtonCtaProps from "@/types/ButtonCtaProps";

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
