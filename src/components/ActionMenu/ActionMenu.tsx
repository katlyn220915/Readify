"use client";
import { useState } from "react";
import styles from "./ActionMenu.module.css";

import ActionIcon from "../ActionIcon/ActionIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { setActionMenuToggle } from "@/lib/redux/features/readSlice";

import {
  faHighlighter,
  faNoteSticky,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import MarkerColorPlatte from "../MarkerColorPlatte/MarkerColorPlatte";

const ActionMenu = ({
  xPosition,
  yPosition,
}: {
  xPosition: number;
  yPosition: number;
}) => {
  const [isColorPlatteOpen, setIsColorPlatteOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { markerColor } = useAppSelector((state) => state.read);

  const handleHighlight = () => {
    const selection = document.getSelection();
    const selectedText = selection?.toString();
    const parent = selection?.anchorNode?.parentElement;
    if (selectedText && parent !== null && parent !== undefined) {
      const pattern = new RegExp(selectedText, "g");
      parent.innerHTML = parent.innerHTML.replace(
        pattern,
        `<span class="epub_hightLight" style='background-color: var(--color-${markerColor})'>${selectedText}</span>`
      );
      dispatch(setActionMenuToggle(false));
    } else {
      console.error("Parent element is undefined.");
    }
  };

  return (
    <div className={styles.action_menu_container}>
      <div
        className={styles.action_menu}
        style={{
          position: "absolute",
          top: `${yPosition}px`,
          left: `${xPosition}px`,
          zIndex: 100,
        }}
      >
        <div className={styles.action_menu_inner}>
          <ActionIcon
            iconProp={faHighlighter}
            promptText="Create highlight"
            position={isColorPlatteOpen ? "bottom" : "top"}
            showPrompt={true}
            onAction={() => handleHighlight()}
            color={markerColor}
          />
          <ActionIcon
            iconProp={faNoteSticky}
            promptText="Add note"
            position={isColorPlatteOpen ? "bottom" : "top"}
            showPrompt={true}
            onAction={() => handleHighlight()}
          />
          <ActionIcon
            iconProp={faEllipsis}
            promptText="Pick marker color"
            position={isColorPlatteOpen ? "bottom" : "top"}
            showPrompt={true}
            onAction={() => setIsColorPlatteOpen(!isColorPlatteOpen)}
          />
          {isColorPlatteOpen && <MarkerColorPlatte />}
        </div>
      </div>
    </div>
  );
};

export default ActionMenu;
