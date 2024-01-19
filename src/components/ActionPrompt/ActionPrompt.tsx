"use client";
import React, { useEffect, useState } from "react";
import styles from "./ActionPrompt.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

type ActionPromptPropsType = {
  isError: boolean;
  errorMes: string | undefined;
  isSuccessful: boolean;
  successfulMes: string;
};

export default function ActionPrompt({
  isError,
  errorMes,
  isSuccessful,
  successfulMes,
}: ActionPromptPropsType) {
  return (
    <>
      <div
        className={`${styles.container} ${isError ? styles.error : ""} ${
          isSuccessful ? styles.successful : ""
        }`}
      >
        <span>
          <FontAwesomeIcon
            icon={isSuccessful ? faCircleCheck : faCircleXmark}
          />
        </span>
        <p>{isError ? errorMes : successfulMes}</p>
      </div>
    </>
  );
}
