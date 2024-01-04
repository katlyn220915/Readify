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

  console.log(chapterArr);

  const handleLoadMore = (currentChapterCount: number) => {
    if (hasMoreChapter) {
      setChapterArr((prevChapters: any) => [
        ...prevChapters,
        bookDocuments[currentChapterCount],
      ]);
      if (chapterCount === bookDocuments.length - 1) setHasMoreChapter(false);
    }
  };

  // useEffect(() => {
  //   const getHighlights = async () => {
  //     const allChapterElement = Array.from(
  //       document.querySelectorAll(".epub_document_content")
  //     );
  //     const highlight = highlightHelper();

  //     allChapterElement.map(async (el: any) => {
  //       const firestore = firestoreMemo();
  //       const chapterId = el.id.replace("/", "");
  //       if (user) {
  //         const highlights = await firestore.getDocuments(
  //           `/users/${user.uid}/${category}/${bookId}/${chapterId}`
  //         );
  //         if (highlights.length > 0) {
  //           highlights.forEach((data: any) => {
  //             const { startNode, endNode } = findCertainNodes(
  //               data.range.start,
  //               data.range.end
  //             );
  //             highlight.highlightText(
  //               startNode,
  //               endNode,
  //               data.range.startOffset,
  //               data.range.endOffset,
  //               data.highlightId,
  //               data.markerColor
  //             );
  //           });
  //         }
  //       }
  //     });
  //   };
  //   getHighlights();
  // }, [bookDocuments.length, bookId, category, firestoreMemo, user]);

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
            handleLoadMore={handleLoadMore}
          />
        )}
      </div>
    </>
  );
}

const findCertainNodes = (startXpath: string, endXpath: string) => {
  console.log("解析", startXpath, "字串");
  console.log("解析", endXpath, "字串");
  const startPathArr = startXpath
    .split("/")
    .filter((cur) => cur !== "/" && cur !== "" && cur !== "");
  const endPathArr = endXpath
    .split("/")
    .filter((cur) => cur !== "/" && cur !== "" && cur !== "");
  const startNode = getNode(startPathArr);
  const endNode = getNode(endPathArr);
  return { startNode, endNode };
};

const getNode = (arr: any[]) => {
  let root = document.querySelectorAll(".epub_document");
  let node: any;
  arr.map((cur, i) => {
    let [element, index] = cur.split(/\[(\d+)\]/);
    console.log("目前為", node, "節點");
    index = parseInt(index);
    element = element.replaceAll("()", "");
    if (element === "text") {
      node = node.childNodes[index - 1];
      console.log("找到文本節點");
    } else if (i === 0) {
      console.log("目前為第一層div，是第", index, "個章節");
      node = root[index - 1];
    } else {
      console.log("目前為第", i, "層", element, index);
      let tempList = node.querySelectorAll(element);
      node = tempList[index - 1];
    }
  });
  return node;
};
