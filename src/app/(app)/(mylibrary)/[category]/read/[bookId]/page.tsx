"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

import ActionMenu from "@/components/ActionMenu/ActionMenu";
import ReadingArea from "@/components/ReadingArea/ReadingArea";
import BookContent from "@/components/BookContent/BookContent";
import ReadingNavigation from "@/components/ReadingNavigation/ReadingNavigation";
import Editor from "@/components/Editor/Editor";

import { useAppSelector } from "@/hooks/redux/hooks";

export default function BookId() {
  const { isActionMenuOpen, actionMenuPositionX, actionMenuPositionY } =
    useAppSelector((state) => state.read);
  const [isNotebookOpen, setIsNotebookOpen] = useState(true);
  const [isContentListOpen, setIsContentListOpen] = useState(false);
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  console.log("render -", " BookId page");

  return (
    <>
      {isActionMenuOpen && (
        <ActionMenu
          xPosition={actionMenuPositionX}
          yPosition={actionMenuPositionY - 50}
        />
      )}
      <ReadingNavigation
        isContentListOpen={isContentListOpen}
        onSetContentListOpen={setIsContentListOpen}
        isNotebookOpen={isNotebookOpen}
        onSetNotebookOpen={setIsNotebookOpen}
        isNavigationVisible={isNavigationVisible}
      />
      <div className={`${styles.container}`}>
        <BookContent isContentListOpen={isContentListOpen} />
        <ReadingArea setIsNavigationVisible={setIsNavigationVisible} />
        <Editor isNotebookOpen={isNotebookOpen} />
      </div>
    </>
  );
}
