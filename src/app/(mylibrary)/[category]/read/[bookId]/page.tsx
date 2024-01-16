"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

import ReadingArea from "@/components/ReadingArea/ReadingArea";
import BookContent from "@/components/BookContent/BookContent";
import ReadingNavigation from "@/components/ReadingNavigation/ReadingNavigation";
import Notebook from "@/components/Notebook/Notebook";

export default function BookId() {
  const [isNotebookOpen, setIsNotebookOpen] = useState(true);
  const [isContentListOpen, setIsContentListOpen] = useState(false);
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  // console.log("render -", " BookId page");

  return (
    <>
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
        <Notebook isNotebookOpen={isNotebookOpen} />
      </div>
    </>
  );
}
