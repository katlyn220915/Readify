"use client";

import React, { Suspense, useEffect, useState } from "react";
import styles from "./Read.module.css";
import { redirect } from "next/navigation";

import ReadingArea from "@/components/readingPage/ReadingArea/ReadingArea";
import ReadingNavigation from "@/components/readingPage/ReadingNavigation/ReadingNavigation";
import Notebook from "@/components/readingPage/Notebook/Notebook";
import BookIndices from "@/components/readingPage/BookIndices/BookIndices";
import { useAuth } from "@/context/AuthContext";
import Spinner from "@/components/common/Spinner/Spinner";

const Read = () => {
  const { user } = useAuth();
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
