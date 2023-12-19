"use client";

import React, { useEffect, useState } from "react";
import styles from "./ReadingArea.module.css";

import Spinner from "../Spinner/Spinner";
import BookContent from "../BookContent/BookContent";
import ReadingAreaNav from "../ReadingAreaNav/ReadingAreNav";
import EbookViewer from "../EbookViewer/EbookViewer";

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

export default function ReadingArea() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookDocuments, setBookDocuments] = useState<any[]>([]);
  const [isContentListOpen, setIsContentListOpen] = useState(true);
  const { actionMenuPositionY } = useAppSelector((state) => state.read);

  const pathname = usePathname();
  const arrPath = pathname.split("/");
  const category = arrPath[1];
  const bookId = arrPath[arrPath.length - 1];

  const { user } = useAuth();
  const firestore = useFirestore();
  const dispatch = useAppDispatch();
  const parser = parseEpub();

  useEffect(() => {
    const bookRender = async () => {
      try {
        setIsLoading(true);
        if (user) {
          const bookData = await firestore.getDocumentById(
            `/users/${user.uid}/${category}`,
            bookId
          );
          if (bookData) {
            dispatch(setCurrentBook(bookData));
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
  }, [user]);

  return (
    <>
      <BookContent isContentListOpen={isContentListOpen} />
      <div
        id="epub-viewer"
        className={`${styles.epubContainer} ${
          !isContentListOpen && styles.contentListClose
        }`}
        onWheel={(e) => {
          const delta = Math.round(e.deltaY);
          dispatch(setActionMenuPositionY(actionMenuPositionY - delta));
        }}
      >
        <ReadingAreaNav
          isContentListOpen={isContentListOpen}
          onSetContentListOpen={setIsContentListOpen}
        />
        {isLoading && <Spinner />}
        <EbookIntroductionHeader />
        <EbookViewer bookDocuments={bookDocuments} />
      </div>
    </>
  );
}

const EbookIntroductionHeader = () => {
  const { currentBook } = useAppSelector((state) => state.read);
  return (
    <div className={styles.book_intro}>
      <h2 className={styles.book_intro_title}>{currentBook?.title}</h2>
      <p className={styles.book_intro_autor}>{currentBook?.author}</p>
    </div>
  );
};
