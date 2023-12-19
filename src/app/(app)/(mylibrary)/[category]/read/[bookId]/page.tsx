"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ReadingArea from "@/components/ReadingArea/ReadingArea";
import ActionMenu from "@/components/ActionMenu/ActionMenu";
import { useAppSelector } from "@/hooks/redux/hooks";

export default function BookId() {
  const { isActionMenuOpen, actionMenuPositionX, actionMenuPositionY } =
    useAppSelector((state) => state.read);
  return (
    <>
      {isActionMenuOpen && (
        <ActionMenu
          xPosition={actionMenuPositionX}
          yPosition={actionMenuPositionY - 50}
        />
      )}
      <div className={`${styles.container}`}>
        <ReadingArea />
      </div>
    </>
  );
}
