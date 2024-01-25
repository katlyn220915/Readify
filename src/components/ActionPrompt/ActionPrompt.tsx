"use client";
import React, { useEffect } from "react";
import styles from "./ActionPrompt.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

type ActionPromptPropsType = {
  isError: boolean;
  isSuccessful: boolean;
  isPending: boolean;
  fileName?: string;
  children: string;
};

export default function ActionPrompt({
  isError,
  isSuccessful,
  isPending,
  children,
}: ActionPromptPropsType) {
  useEffect(() => {
    if (!isPending) return;
    const progressbar = 100;
  }, [isPending]);

  return (
    <>
      <div className={`${styles.container}`}>
        <div
          className={` ${styles.prompt_box} ${isError ? styles.error : ""} ${
            isSuccessful ? styles.successful : ""
          }`}
        >
          <span>
            <FontAwesomeIcon icon={isError ? faCircleXmark : faCircleCheck} />
          </span>
          {<p>{children}</p>}
        </div>
        <div
          className={`${styles.prompt_box} ${
            isPending ? styles.isPending : ""
          }`}
        >
          {<p>{children}</p>}
        </div>
      </div>
    </>
  );
}
