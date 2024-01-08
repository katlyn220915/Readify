import React, { useEffect, useCallback } from "react";

import { useAppSelector } from "@/hooks/redux/hooks";
import useFirestore from "@/hooks/firebase_db/useFirestore";

import { useAuth } from "@/context/AuthContext";
import highlightHelper from "@/utils/highlightHelper";

const EbookChapter = ({ divElement }: { divElement: React.JSX.Element }) => {
  const { fontSize, lineSpacing, currentCategory, currentBook } =
    useAppSelector((state) => state.read);
  const firestoreMemo = useCallback(useFirestore, [useFirestore]);
  const { user } = useAuth();

  // useEffect(() => {
  //   const getHighlights = async () => {
  //     if (!currentBook) return;
  //     const chapterId = divElement.props.id.replaceAll("/", "");
  //     const firestore = firestoreMemo();
  //     const highlight = highlightHelper();
  //     const highlightsData = await firestore.getDocuments(
  //       `/users/${user.uid}/${currentCategory}/${currentBook.bookId}/highlights`
  //     );

  //     console.log("章節-", chapterId, "的畫記號資料", highlightsData);
  //     if (highlightsData.length > 0) {
  //       highlightsData.forEach((data: any) => {
  //         const { startNode, endNode } = highlight.findCertainNodes(
  //           data.range.start,
  //           data.range.end
  //         );
  //         highlight.highlightText(
  //           startNode,
  //           endNode,
  //           data.range.startOffset,
  //           data.range.endOffset,
  //           data.highlightId,
  //           data.markerColor
  //         );
  //       });
  //     }
  //   };
  //   getHighlights();
  // }, []);

  return (
    <div
      className="epub_document"
      style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
    >
      {divElement}
    </div>
  );
};
export default EbookChapter;
