"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

import ReadingArea from "@/components/ReadingArea/ReadingArea";
import ReadingNavigation from "@/components/ReadingNavigation/ReadingNavigation";
import Notebook from "@/components/Notebook/Notebook";
import BookIndices from "@/components/BookIndices/BookIndices";
import { useRWD } from "@/hooks/useRWD/useRWD";

export default function BookId() {
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isContentListOpen, setIsContentListOpen] = useState(false);
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);
  const { screenWidth } = useRWD();

  // console.log("render -", " BookId page");

  return (
    <>
      {screenWidth > 1024 && (
        <ReadingNavigation
          isContentListOpen={isContentListOpen}
          onSetContentListOpen={setIsContentListOpen}
          isNotebookOpen={isNotebookOpen}
          onSetNotebookOpen={setIsNotebookOpen}
          isNavigationVisible={isNavigationVisible}
        />
      )}
      {screenWidth < 1024 && !isNotebookOpen && !isContentListOpen && (
        <ReadingNavigation
          isContentListOpen={isContentListOpen}
          onSetContentListOpen={setIsContentListOpen}
          isNotebookOpen={isNotebookOpen}
          onSetNotebookOpen={setIsNotebookOpen}
          isNavigationVisible={isNavigationVisible}
        />
      )}
      {screenWidth > 1024 && (
        <div className={`${styles.container}`}>
          <BookIndices
            isContentListOpen={isContentListOpen}
            onContentListOpen={setIsContentListOpen}
          />
          <ReadingArea setIsNavigationVisible={setIsNavigationVisible} />
          <Notebook
            isNotebookOpen={isNotebookOpen}
            onSetIsNotebookOpen={setIsNotebookOpen}
          />
        </div>
      )}
      {screenWidth < 1024 && (
        <div className={`${styles.container}`}>
          <ReadingArea setIsNavigationVisible={setIsNavigationVisible} />
          {isContentListOpen && (
            <BookIndices
              isContentListOpen={isContentListOpen}
              onContentListOpen={setIsContentListOpen}
            />
          )}
          {isNotebookOpen && (
            <Notebook
              isNotebookOpen={isNotebookOpen}
              onSetIsNotebookOpen={setIsNotebookOpen}
            />
          )}
        </div>
      )}
    </>
  );
}
