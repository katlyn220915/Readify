"use client";

import React, { Dispatch } from "react";
import styles from "./EbookViewer.module.css";

import EbookChapter from "../EbookChapter/EbookChapter";

import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import getSelectionData from "@/utils/getSelectionData";

import { literata, roboto, inter } from "@/fonts/fonts";
import {
  setActionMenuToggle,
  setActionMenuPosition,
  setDeleteHighlightMode,
  setCurrentChapter,
} from "@/lib/redux/features/readSlice";
import highlightHelper from "@/utils/highlightHelper";

const EbookViewer = ({ bookDocuments }: { bookDocuments: any[] }) => {
  const { isDeleteMode, isActionMenuOpen, typeface } = useAppSelector(
    (state) => state.read
  );
  const dispatch = useAppDispatch();

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
        className={`${styles.viewer} ${typeface.className}`}
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
    </>
  );
};

export default EbookViewer;
