"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
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

  const pathname = usePathname();
  const arrPath = pathname.split("/");
  const category = arrPath[1];
  const bookId = arrPath[arrPath.length - 1];

  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const parserMemo = useCallback(parseEpub, [parseEpub]);
  const firestoreMemo = useCallback(useFirestore, [useFirestore]);

  console.log("render-", " ReadingArea");

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
      const allChapterElement = Array.from(
        document.querySelectorAll(".epub_document_content")
      );

      allChapterElement.map(async (el: any) => {
        const firestore = firestoreMemo();
        const chapterId = el.id.replace("/", "");
        if (user) {
          const highlights = await firestore.getDocuments(
            `/users/${user.uid}/${category}/${bookId}/${chapterId}`
          );
          if (highlights.length > 0) {
            highlights.forEach((item: any) => {
              const allElements = el.querySelectorAll(
                item.tagName.toLowerCase()
              );
              const highlightElement = allElements[item.indexOfTag];
              const pattern = new RegExp(item.text, "g");
              highlightElement.innerHTML = highlightElement.innerHTML.replace(
                pattern,
                `<span class="epub_highlight" style="background-color: var(--color-${item.markerColor})" data-highlight-id=${item.highlightId}>${item.text}</span>`
              );
            });
          }
        }
      });
    };
    getHighlights();
  }, [bookDocuments.length, bookId, category, firestoreMemo, user]);

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