import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./BookContents.module.css";

import EbookChapter from "../EbookChapter/EbookChapter";

import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import {
  setActionMenuToggle,
  setDeleteHighlightMode,
  setCurrentChapter,
} from "@/lib/redux/features/readSlice";
import { setPosition } from "@/lib/redux/features/bookMarkSlice";

import getSelectionData from "@/utils/getSelectionData";
import { findChapterElement } from "@/utils/helper";

import { getElementPositionY } from "@/utils/helper";

const BookContents = ({ bookDocuments }: { bookDocuments: any[] }) => {
  const currentParagraph = useRef<null | HTMLElement>(null);

  const { isDeleteMode, isActionMenuOpen, typeface, currentChapter } =
    useAppSelector((state) => state.read);
  const { isIndicatorIntersecting } = useAppSelector((state) => state.bookMark);

  const dispatch = useAppDispatch();
  const changeTargetCb = useCallback(
    function changeTargetElement(
      lastTarget: HTMLElement | null,
      newTarget: HTMLElement
    ) {
      if (lastTarget) lastTarget.removeAttribute("data-indicator");
      newTarget.dataset.indicator = "true";
      const { height, positionY } = getElementPositionY("viewer", newTarget);
      dispatch(setPosition({ height, transform: positionY }));
      return newTarget;
    },
    [dispatch]
  );

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
      currentParagraph.current = changeTargetCb(
        currentParagraph.current,
        target
      );
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

  useEffect(() => {
    if (!currentParagraph.current) return;
    if (!isIndicatorIntersecting) {
      const left = document
        .querySelector(".epub_document_content")
        ?.getBoundingClientRect().left as number;
      const top = { x: left + 100, y: 100 };
      const topEl = document.elementFromPoint(top.x, top.y) as HTMLElement;

      if (topEl && topEl.tagName.toLowerCase() === "p") {
        currentParagraph.current = changeTargetCb(
          currentParagraph.current,
          topEl
        );
      } else if (currentParagraph.current.nextElementSibling) {
        currentParagraph.current = changeTargetCb(
          currentParagraph.current,
          currentParagraph.current.nextElementSibling as HTMLElement
        );
      }
    }
  }, [bookDocuments.length, isIndicatorIntersecting, dispatch, changeTargetCb]);

  return (
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
  );
};

export default BookContents;