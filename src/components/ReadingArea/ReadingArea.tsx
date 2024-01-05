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
  setCurrentChapter,
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
  const [chapterArr, setChapterArr] = useState<any>([]);
  const [hasMoreChapter, setHasMoreChapter] = useState(true);
  const [chapterCount, setChapterCount] = useState(0);

  const pathname = usePathname();
  const arrPath = pathname.split("/");
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
            setChapterArr([customReactJSXDivs[0]]);
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

  console.log("目前新陣列為：", chapterArr);

  //When the observered div element has been triggered, the chapterCount would change, then this effect would be triggered too.
  useEffect(() => {
    if (
      hasMoreChapter &&
      bookDocuments[chapterCount] !== undefined &&
      bookDocuments[chapterCount] !== null
    ) {
      console.log(
        "setChapterCount 已經執行，目前chapterCount為: ",
        chapterCount
      );
      setChapterArr((prevChapters: any) => [
        ...prevChapters,
        bookDocuments[chapterCount],
      ]);
      if (chapterCount === bookDocuments.length - 1) {
        setHasMoreChapter(false);
        console.log("目前chapterCount = ", chapterCount, "已經無下一章節了");
      }
    }
  }, [chapterCount, hasMoreChapter]);

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
        {bookDocuments && (
          <EbookViewer
            bookDocuments={chapterArr}
            onSetChapterCount={setChapterCount}
            hasMoreChapter={hasMoreChapter}
          />
        )}
      </div>
    </>
  );
}
