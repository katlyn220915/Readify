"use client";

import React, { Suspense, useEffect, useState } from "react";

import { redirect } from "next/navigation";

import Spinner from "@/components/common/Spinner/Spinner";
import BookIndices from "@/components/readingPage/BookIndices/BookIndices";
import Notebook from "@/components/readingPage/Notebook/Notebook";
import ReadingArea from "@/components/readingPage/ReadingArea/ReadingArea";
import ReadingNavigation from "@/components/readingPage/ReadingNavigation/ReadingNavigation";
import { useAuthContext } from "@/context";

import styles from "./Read.module.css";

const Read = () => {
  const { user } = useAuthContext();
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isContentListOpen, setIsContentListOpen] = useState(false);

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) redirect("/signin");
  }, [user]);

  return (
    <Suspense fallback={<Spinner />}>
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
    </Suspense>
  );
};

export default Read;
