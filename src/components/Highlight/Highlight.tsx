import React from "react";
import styles from "./Highlight.module.css";

export default function Highlight({ highlight }: { highlight: any }) {
  return (
    <div
      className={styles.highlight}
      data-note-id={highlight.id}
      onClick={(e) => {
        console.log(e.target);
        let element = e.target as HTMLElement;
        if (!element.id && element.parentElement) {
          element = element.parentElement;
        }
        const target = document.querySelector(
          `[data-highlight-id="${element.dataset.noteId}"]`
        );
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        } else {
          console.log("該highlight章節還不存在");
        }
      }}
    >
      <span
        style={{ backgroundColor: `var(--color-${highlight.markerColor})` }}
      >
        {highlight.text}
      </span>
    </div>
  );
}
