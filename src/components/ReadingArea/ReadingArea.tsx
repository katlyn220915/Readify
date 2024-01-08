"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import styles from "./ReadingArea.module.css";

import Spinner from "../Spinner/Spinner";
import EbookViewer from "../EbookViewer/EbookViewer";
import EbookIntroductionHeader from "../EbookIntroductionHeader/EbookIntroductionHeader";

/* HOOKS */
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { useAuth } from "@/context/AuthContext";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import parseEpub from "@/server-actions/parseEpub/parseEpub";

import {
  setCurrentBook,
  setActionMenuPositionY,
} from "@/lib/redux/features/readSlice";
import { setHighlight } from "@/lib/redux/features/noteSlice";
import highlightHelper from "@/utils/highlightHelper";

export default function ReadingArea({
  setIsNavigationVisible,
}: {
  setIsNavigationVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [bookDocuments, setBookDocuments] = useState<any[]>([]);
  const { actionMenuPositionY, isActionMenuOpen } = useAppSelector(
    (state) => state.read
  );

  const arrPath = usePathname().split("/");
  const category = arrPath[1];
  const bookId = arrPath[arrPath.length - 1];

  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const parserMemo = useCallback(parseEpub, [parseEpub]);
  const firestoreMemo = useCallback(useFirestore, [useFirestore]);

  //初始useEffect
  useEffect(() => {
    const bookRender = async () => {
      const parser = parserMemo();
      const firestore = firestoreMemo();
      try {
        setIsLoading(true);
        if (user) {
          const bookData = await firestore.getDocumentById(
            `/users/${user.uid}/${category}`,
            bookId
          );
          dispatch(setCurrentBook({ currentBook: bookData, category }));
          if (bookData) {
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
        console.log(e);
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
          `/users/${user.uid}/${category}/${bookId}/highlights`
        );
        let highlights: any[] = [];
        if (highlightsData.length > 0) {
          highlightsData.forEach((chapter: any) => {
            for (const key in chapter) {
              console.log(key, "=>", chapter[key]);
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
          dispatch(setHighlight(highlights));
        }
      } catch (e) {
        console.log("ReadingArea component error: ", e);
      }
    };
    getHighlights();
  }, [bookDocuments.length, category, firestoreMemo, user, bookId, dispatch]);

  return (
    <>
      <div
        id="epub-viewer"
        className={`${styles.epubContainer}`}
        onWheel={(e) => {
          const delta = Math.round(e.deltaY);
          if (isActionMenuOpen)
            dispatch(setActionMenuPositionY(actionMenuPositionY - delta));
          if (delta < 0) {
            setIsNavigationVisible(true);
          } else {
            setIsNavigationVisible(false);
          }
        }}
      >
        {isLoading && <Spinner />}
        <EbookIntroductionHeader />
        {bookDocuments && <EbookViewer bookDocuments={bookDocuments} />}
      </div>
    </>
  );
}
