"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

import ReadingArea from "@/components/readingPage/ReadingArea/ReadingArea";
import ReadingNavigation from "@/components/readingPage/ReadingNavigation/ReadingNavigation";
import Notebook from "@/components/readingPage/Notebook/Notebook";
import BookIndices from "@/components/readingPage/BookIndices/BookIndices";

export default function BookId() {
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isContentListOpen, setIsContentListOpen] = useState(false);

  return (
    <>
      <ReadingNavigation
        isContentListOpen={isContentListOpen}
        onSetContentListOpen={setIsContentListOpen}
        isNotebookOpen={isNotebookOpen}
        onSetNotebookOpen={setIsNotebookOpen}
      />
      <div className={`${styles.container}`}>
        <BookIndices
          isContentListOpen={isContentListOpen}
          onContentListOpen={setIsContentListOpen}
        />
        <ReadingArea
          isContentListOpen={isContentListOpen}
          isNotebookOpen={isNotebookOpen}
        />
        <Notebook
          isNotebookOpen={isNotebookOpen}
          onSetIsNotebookOpen={setIsNotebookOpen}
        />
      </div>
    </>
  );
}
