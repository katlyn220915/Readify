"use client";

import React, { useEffect } from "react";
import styles from "./EbookViewer.module.css";

import EbookChapter from "../EbookChapter/EbookChapter";
import BookMark from "../BookMark/BookMark";

import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import {
  setActionMenuToggle,
  setDeleteHighlightMode,
  setCurrentChapter,
} from "@/lib/redux/features/readSlice";
import { setPosition } from "@/lib/redux/features/bookMarkSlice";

import getSelectionData from "@/utils/getSelectionData";
import { findChapterElement } from "@/utils/helper";
import ActionMenu from "../ActionMenu/ActionMenu";

const EbookViewer = ({ bookDocuments }: { bookDocuments: any[] }) => {
  const { isDeleteMode, isActionMenuOpen, typeface, currentChapter } =
    useAppSelector((state) => state.read);
  const dispatch = useAppDispatch();

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const selectionData = getSelectionData();
    const target = e.target as HTMLElement;
    if (!selectionData || target.className !== "epub_highlight") {
      dispatch(setActionMenuToggle(false));
    }
    if (selectionData || target.className === "epub_highlight") {
      dispatch(setActionMenuToggle(true));
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(setActionMenuToggle(false));
    const target = e.target as HTMLElement;
    if (target.id === "viewer" || target.className === "epub_document") return;
    if (target.tagName.toLowerCase() !== "div") {
      const rootEl = document.getElementById("viewer");
      const rootRect = rootEl?.getBoundingClientRect();
      const rect = target.getBoundingClientRect();
      if (rootRect) {
        const transform = rect.top - rootRect.top;
        dispatch(setPosition({ height: rect.height, transform }));
      }
    }
    const { chapterID } = findChapterElement(target);
    if (chapterID !== currentChapter) dispatch(setCurrentChapter(chapterID));
    if (target.className === "epub_highlight") {
      if (!isActionMenuOpen) {
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
      <div className={styles.root}>
        <ActionMenu />
        <BookMark />
        <div
          id="viewer"
          className={`${styles.viewer} ${typeface.className}`}
          onMouseDown={(e) => {
            handleMouseDown(e);
          }}
          onMouseUp={(e) => {
            handleMouseUp(e);
          }}
        >
          {bookDocuments !== undefined &&
            bookDocuments.map((div) => (
              <EbookChapter divElement={div} key={div.props.id} />
            ))}
        </div>
      </div>
    </>
  );
};

export default EbookViewer;
