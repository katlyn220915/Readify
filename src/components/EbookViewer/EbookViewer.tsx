"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./EbookViewer.module.css";

import EbookChapter from "../EbookChapter/EbookChapter";
import findIndexOfParentElement from "@/utils/findIndexOfParentElement";

import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import getSelectionData from "@/utils/getSelectionData";

import { literata } from "@/fonts/fonts";
import {
  setActionMenuToggle,
  setActionMenuPosition,
  setDeleteHighlightMode,
  setCurrentChapter,
} from "@/lib/redux/features/readSlice";
import highlightHelper from "@/utils/highlightHelper";

const EbookViewer = ({
  bookDocuments,
  onSetChapterCount,
  hasMoreChapter,
}: {
  bookDocuments: any[];
  onSetChapterCount: Dispatch<number>;
  hasMoreChapter: boolean;
}) => {
  const { isDeleteMode, isActionMenuOpen } = useAppSelector(
    (state) => state.read
  );
  const dispatch = useAppDispatch();
  const lastElementRef = useRef(null);
  const countRef = useRef(0);

  const handleIntersection = (entries: any) => {
    if (entries[0].isIntersecting) {
      console.log("Last element is intersecting!");
      console.log("是否還有下一章節，", hasMoreChapter);
      if (hasMoreChapter) {
        countRef.current = countRef.current + 1;
        console.log(
          "目前chapter count =",
          countRef.current,
          "準備呼叫setChapterCount"
        );
        onSetChapterCount(countRef.current);
        dispatch(setCurrentChapter(countRef.current));
      }
    }
  };

  useEffect(() => {
    console.log("這個effect有被執行");
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    if (lastElementRef.current && hasMoreChapter) {
      observer.observe(lastElementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMouseUp = () => {
    const selectionData = getSelectionData();
    if (selectionData) {
      const { rec, selectedText } = selectionData;
      console.log(rec);
      console.log(selectedText);
      if (rec) {
        dispatch(
          setActionMenuPosition({
            positionX: rec.left + rec.width / 2 - 75 / 2,
            positionY: rec.top,
          })
        );
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(setActionMenuToggle(false));
    const highlight = highlightHelper();
    const target = e.target as HTMLElement;
    if (target.id === "viewer" || target.className === "epub_document") return;
    console.log(target);
    const { chapterID } = highlight.findChapterElement(target);
    dispatch(setCurrentChapter(chapterID));
    if (target.className === "epub_highlight") {
      if (!isActionMenuOpen) {
        dispatch(
          setActionMenuPosition({
            positionX: e.pageX - 75,
            positionY: e.pageY - 50,
          })
        );
        dispatch(
          setDeleteHighlightMode({
            isDeleteMode: true,
            highlightId: target.dataset.highlightId,
          })
        );
      }
    } else if (isDeleteMode) {
      dispatch(
        setDeleteHighlightMode({
          isDeleteMode: false,
          highlightId: null,
        })
      );
    }
  };

  return (
    <>
      <div
        id="viewer"
        className={`${styles.viewer} ${literata.className}`}
        onMouseDown={(e) => {
          handleMouseDown(e);
        }}
        onMouseUp={() => {
          handleMouseUp();
        }}
      >
        {bookDocuments !== undefined &&
          bookDocuments.map((div) => (
            <EbookChapter divElement={div} key={div.props.id} />
          ))}
      </div>
      {hasMoreChapter && <div ref={lastElementRef}>Load More ...</div>}
    </>
  );
};

export default EbookViewer;
