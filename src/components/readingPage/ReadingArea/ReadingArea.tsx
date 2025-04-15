"use client";

import React, { useCallback, useEffect, useState } from "react";

/* HOOKS */
import { usePathname } from "next/navigation";

import Spinner from "@/components/common/Spinner/Spinner";
import { useAuth } from "@/context/AuthContext";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAppDispatch } from "@/hooks/redux/hooks";
import { setHighlight } from "@/lib/redux/features/noteSlice";
import { setCurrentBook } from "@/lib/redux/features/readSlice";
import parseEpub from "@/server-actions/parseEpub/parseEpub";
import highlightHelper from "@/utils/highlightHelper";

import ContentsRoot from "../ContentsRoot/ContentsRoot";
import EbookIntroductionHeader from "../EbookIntroductionHeader/EbookIntroductionHeader";
import styles from "./ReadingArea.module.css";

export default function ReadingArea({
  isContentListOpen,
  isNotebookOpen,
}: {
  isContentListOpen: boolean;
  isNotebookOpen: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [bookDocuments, setBookDocuments] = useState<any[]>([]);
  const [bookData, setBookData] = useState<any>();

  const arrPath = usePathname().split("/");
  const category = arrPath[1];
  const bookId = arrPath[arrPath.length - 1];

  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const parserMemo = useCallback(parseEpub, [parseEpub]);
  const firestoreMemo = useCallback(useFirestore, [useFirestore]);

  useEffect(() => {
    const bookRender = async () => {
      const parser = parserMemo();
      const firestore = firestoreMemo();
      try {
        setIsLoading(true);
        if (user) {
          const bookData = await firestore.getDocumentById(
            `/users/${user.uid}/books`,
            bookId
          );
          if (bookData) {
            setBookData(bookData);
            const recordChapter = bookData.record ? bookData.record : undefined;
            dispatch(
              setCurrentBook({
                currentBook: bookData,
                category,
                chapter: recordChapter,
              })
            );
            const epubDocuments = await parser.getAllDocuments(
              bookData.bookDownloadURL
            );
            const customReactJSXDivs = parser.handleDocuments(
              epubDocuments,
              bookData.images
            );
            setBookDocuments(customReactJSXDivs);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    bookRender();
  }, [user, bookId, category, dispatch, parserMemo, firestoreMemo]);

  useEffect(() => {
    const getHighlights = async () => {
      if (bookDocuments.length === 0) return;
      const firestore = firestoreMemo();
      const highlight = highlightHelper();
      try {
        const highlightsData = await firestore.getDocuments(
          `/users/${user.uid}/books/${bookId}/highlights`
        );

        let highlights: any[] = [];
        if (highlightsData.length > 0) {
          highlightsData.forEach((chapter: any) => {
            for (const key in chapter) {
              highlights.push(chapter[key]);
              const { startNode, endNode } = highlight.findCertainNodes(
                chapter[key].range.start,
                chapter[key].range.end
              );
              highlight.highlightText(
                startNode,
                endNode,
                chapter[key].range.startOffset,
                chapter[key].range.endOffset,
                chapter[key].id,
                chapter[key].markerColor
              );
            }
          });
          dispatch(setHighlight(highlights.reverse()));
        }
      } catch (e) {
        console.error("ReadingArea component error: ", e);
      }
    };
    getHighlights();
  }, [bookDocuments.length, category, firestoreMemo, user, bookId, dispatch]);

  return (
    <>
      <div
        id="epub-viewer"
        className={`${styles.epubContainer} ${
          isContentListOpen || isNotebookOpen ? styles.hideReadingArea : ""
        }`}
      >
        {isLoading && <Spinner />}
        <EbookIntroductionHeader />
        {bookDocuments && (
          <ContentsRoot
            bookDocuments={bookDocuments}
            bookMark={bookData?.bookMark}
          />
        )}
      </div>
    </>
  );
}
