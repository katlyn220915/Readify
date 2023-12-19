"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./EbookViewer.module.css";

import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { literata } from "@/fonts/fonts";
import {
  setActionMenuToggle,
  setActionMenuPositionX,
  setActionMenuPositionY,
} from "@/lib/redux/features/readSlice";

const EbookViewer = ({ bookDocuments }: { bookDocuments: any[] }) => {
  const { fontSize, lineSpacing } = useAppSelector((state) => state.read);
  const dispatch = useAppDispatch();

  const handleMouseUp = () => {
    const selection = document.getSelection();
    const selectedText = selection?.toString();
    if (selectedText === " " || !selectedText) return;
    const range = selection?.getRangeAt(0);
    const rec = range?.getBoundingClientRect();
    if (rec && range) {
      dispatch(setActionMenuPositionX(rec.left + rec.width / 2 - 75 / 2));
      dispatch(setActionMenuPositionY(Math.round(rec.top)));
      dispatch(setActionMenuToggle(true));
    }
  };

  return (
    <>
      <div id="viewer" className={`${styles.viewer} ${literata.className}`}>
        <div>
          {bookDocuments &&
            bookDocuments.map((div) => (
              <div
                className="epub_document"
                key={div.props.id}
                style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
                onMouseDown={(e) => {
                  dispatch(setActionMenuToggle(false));
                  dispatch(setActionMenuPositionX(Math.round(e.pageX)));
                  console.log("mouse dowm");
                }}
                onMouseUp={() => {
                  handleMouseUp();
                }}
              >
                {div}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default EbookViewer;
