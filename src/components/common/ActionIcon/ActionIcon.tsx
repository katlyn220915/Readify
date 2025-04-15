"use client";

import React, { useState } from "react";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Prompt from "../Prompt/Prompt";
import styles from "./ActionIcon.module.css";

interface ActionIconProps {
  iconProp: IconDefinition;
  promptText: string;
  position: "top" | "right" | "bottom" | "left";
  showPrompt?: boolean;
  onAction?: () => void;
  color?: string;
}

export default function ActionIcon({
  iconProp,
  promptText,
  position,
  showPrompt = true,
  onAction = () => {},
  color,
}: ActionIconProps) {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  return (
    <>
      <button
        onMouseEnter={(e) => {
          setIsMouseEnter(true);
        }}
        onMouseLeave={() => {
          setIsMouseEnter(false);
        }}
        onClick={onAction}
        className={styles.btn}
      >
        <FontAwesomeIcon
          icon={iconProp}
          className="icon"
          style={{ color: `var(--color-${color})` }}
        />
        {showPrompt && (
          <Prompt isMouseEnter={isMouseEnter} position={position}>
            {promptText}
          </Prompt>
        )}
      </button>
    </>
  );
}
