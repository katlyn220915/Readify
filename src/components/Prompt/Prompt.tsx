import React from "react";
import styles from "./Prompt.module.css";

export default function Prompt({
  children,
  isMouseEnter,
  position,
}: {
  children: React.ReactNode;
  isMouseEnter: boolean;
  position: "right" | "bottom" | "top";
}) {
  return (
    <>
      {isMouseEnter && (
        <span
          className={`${styles.prompt} ${
            position === "right"
              ? styles.prompt__position_right
              : position === "bottom"
              ? styles.prompt__position_bottom
              : styles.prompt__position_top
          }`}
        >
          {children}
        </span>
      )}
    </>
  );
}
