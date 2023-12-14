"use client";

import React, { useState } from "react";
import styles from "./ActionIcon.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Prompt from "../Prompt/Prompt";

export default function ActionIcon({
  iconProp,
  promptText,
  position,
  showPrompt,
  onAction,
}: {
  iconProp: IconDefinition;
  promptText: string;
  position: "top" | "right" | "bottom";
  showPrompt: boolean;
  onAction: () => void;
}) {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  return (
    <>
      <button
        onMouseEnter={() => {
          setIsMouseEnter(true);
        }}
        onMouseLeave={() => {
          setIsMouseEnter(false);
        }}
        onClick={onAction}
      >
        <FontAwesomeIcon icon={iconProp} className="icon" />
      </button>
      {showPrompt && (
        <Prompt isMouseEnter={isMouseEnter} position={position}>
          {promptText}
        </Prompt>
      )}
    </>
  );
}
