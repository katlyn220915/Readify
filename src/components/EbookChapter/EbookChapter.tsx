import React, { useEffect, useCallback } from "react";

import { useAppSelector } from "@/hooks/redux/hooks";
import useFirestore from "@/hooks/firebase_db/useFirestore";

import { useAuth } from "@/context/AuthContext";
import { scrollIntoScreen } from "@/utils/helper";

const EbookChapter = React.memo(
  ({ divElement }: { divElement: React.JSX.Element }) => {
    const {
      fontSize,
      lineSpacing,
      currentCategory,
      currentBook,
      currentChapter,
    } = useAppSelector((state) => state.read);
    const firestoreMemo = useCallback(useFirestore, [useFirestore]);
    const { user } = useAuth();

    useEffect(() => {
      if (currentChapter !== undefined) {
        const chapterElement = document.getElementById(currentChapter);
        if (chapterElement) scrollIntoScreen(chapterElement, "start");
      }
    }, []);

    return (
      <div
        className="epub_document"
        style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
      >
        {divElement}
      </div>
    );
  }
);

EbookChapter.displayName = "EbookChapter";

export default EbookChapter;
