"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./BookContent.module.css";

import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import parseEpub from "@/server-actions/parseEpub/parseEpub";
import { setCurrentChapter } from "@/lib/redux/features/readSlice";

import { decode, scrollIntoScreen } from "@/utils/helper";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAuth } from "@/context/AuthContext";

type ContentItemProp = {
  id: string | number;
  label: string;
  href: string;
};

const BookContent = React.memo(
  ({ isContentListOpen }: { isContentListOpen: boolean }) => {
    const { currentBook } = useAppSelector((state) => state.read);
    const [toc, setToc] = useState<null | ContentItemProp[]>();

    const currentBookMemo = useMemo(() => {
      return currentBook;
    }, [currentBook]);
    const parserMemo = useCallback(parseEpub, [parseEpub]);

    useEffect(() => {
      const getBookContents = async () => {
        if (currentBookMemo) {
          const parser = parserMemo();
          const tocList = await parser.getContents(
            currentBookMemo?.bookDownloadURL
          );
          setToc(tocList);
        }
      };
      getBookContents();
      return () => {
        setToc(null);
      };
    }, [currentBookMemo, parserMemo]);

    return (
      <>
        <aside
          className={`${styles.sidebar} ${
            isContentListOpen ? "" : styles.sidebar_close
          }`}
        >
          <div className={styles.contents_wrapper}>
            <p className={styles.title}>{currentBook?.title}</p>
            <div className={styles.contents}>
              {toc &&
                toc.map((toc: ContentItemProp) => (
                  <ContentButton contentItem={toc} key={toc.href} />
                ))}
            </div>
          </div>
        </aside>
      </>
    );
  }
);

BookContent.displayName = "BookContent";

export default BookContent;

const ContentButton = ({ contentItem }: { contentItem: ContentItemProp }) => {
  const { currentChapter, currentCategory, currentBook } = useAppSelector(
    (state) => state.read
  );
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const firebase = useFirestore();
  console.log(contentItem.href);

  return (
    <button
      onClick={() => {
        const decodeedHref = decode(contentItem.href);
        const paragraphElement = document.getElementById(`${decodeedHref}`);
        if (paragraphElement && currentBook?.bookId) {
          scrollIntoScreen(paragraphElement, "start");
          dispatch(setCurrentChapter(contentItem.id));
          firebase.updateDocument(
            `/users/${user.uid}/${currentCategory}`,
            currentBook?.bookId,
            {
              record: contentItem.id,
            }
          );
        }
      }}
      className={`${styles.contentBtn} ${
        currentChapter === contentItem.id ? styles.contentBtn_active : ""
      }`}
    >
      {contentItem.label}
    </button>
  );
};
