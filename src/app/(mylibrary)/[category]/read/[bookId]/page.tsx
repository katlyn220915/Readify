"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

import ReadingArea from "@/components/ReadingArea/ReadingArea";
import ReadingNavigation from "@/components/ReadingNavigation/ReadingNavigation";
import Notebook from "@/components/Notebook/Notebook";
import BookIndices from "@/components/BookIndices/BookIndices";

export default function BookId() {
  const [isNotebookOpen, setIsNotebookOpen] = useState(true);
  const [isContentListOpen, setIsContentListOpen] = useState(true);
  const [isNavigationVisible, setIsNavigationVisible] = useState(true);

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
        <BookIndices isContentListOpen={isContentListOpen} />
        <ReadingArea setIsNavigationVisible={setIsNavigationVisible} />
        <Notebook isNotebookOpen={isNotebookOpen} />
      </div>
    </>
  );
}
