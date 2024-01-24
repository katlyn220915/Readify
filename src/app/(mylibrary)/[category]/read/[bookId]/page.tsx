"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

import ReadingArea from "@/components/ReadingArea/ReadingArea";
import ReadingNavigation from "@/components/ReadingNavigation/ReadingNavigation";
import Notebook from "@/components/Notebook/Notebook";
import BookIndices from "@/components/BookIndices/BookIndices";
import { useRWD } from "@/hooks/useRWD/useRWD";

export default function BookId() {
  const [isNotebookOpen, setIsNotebookOpen] = useState(true);
  const [isContentListOpen, setIsContentListOpen] = useState(true);

  // console.log("render -", " BookId page");

  return (
    <>
      <ReadingNavigation
        isContentListOpen={isContentListOpen}
        onSetContentListOpen={setIsContentListOpen}
        isNotebookOpen={isNotebookOpen}
        onSetNotebookOpen={setIsNotebookOpen}
      />
      <div className={`${styles.container}`}>
        <BookIndices isContentListOpen={isContentListOpen} />
        <ReadingArea />
        <Notebook isNotebookOpen={isNotebookOpen} />
      </div>
    </>
  );
}
