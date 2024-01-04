"use client";
import { useState } from "react";
import styles from "./ActionMenu.module.css";

import ActionIcon from "../ActionIcon/ActionIcon";
import MarkerColorPlatte from "../MarkerColorPlatte/MarkerColorPlatte";

import { useAuth } from "@/context/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { setActionMenuToggle } from "@/lib/redux/features/readSlice";

import getSelectionData from "@/utils/getSelectionData";

import {
  faHighlighter,
  faNoteSticky,
  faEllipsis,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { fromRange } from "xpath-range";
import highlightHelper from "@/utils/highlightHelper";

const ActionMenu = ({
  xPosition,
  yPosition,
}: {
  xPosition: number;
  yPosition: number;
}) => {
  const [isColorPlatteOpen, setIsColorPlatteOpen] = useState(false);
  const firestore = useFirestore();
  const dispatch = useAppDispatch();
  const {
    markerColor,
    isDeleteMode,
    deleteHighlightID,
    currentBook,
    currentCategory,
    currentChapter,
  } = useAppSelector((state) => state.read);
  const { user } = useAuth();

  const handleHighlight = () => {
    const selectionData = getSelectionData();
    if (selectionData) {
      const { range, startContainer, endContainer, selectedText } =
        selectionData;
      const root = document.querySelector("#viewer");
      const xpath = fromRange(range, root);
      const { start, startOffset, end, endOffset } = xpath;
      console.log(start, startOffset, end, endOffset);
      const highlightId = Math.random().toString(36).substring(2);
      const highlight = highlightHelper();

      highlight.highlightText(
        startContainer,
        endContainer,
        startOffset,
        endOffset,
        highlightId,
        markerColor
      );

      if (currentChapter) {
        firestore.setDocument(
          `/users/${user.uid}/${currentCategory}/${
            currentBook?.bookId
          }/${currentChapter.replace("/", "")}`,
          `${highlightId}`,
          {
            highlightId,
            markerColor,
            text: selectedText,
            range: xpath,
          }
        );
      }
    }
  };

  const handleDeleteHighlight = async () => {
    try {
      console.log(deleteHighlightID);
      if (deleteHighlightID) {
        const highlight = highlightHelper();
        highlight.deleteHighlight(deleteHighlightID);
        await firestore.deleteDocument(
          `/users/${user.uid}/${currentCategory}/${
            currentBook?.bookId
          }/${currentChapter?.replaceAll("/", "")}/${deleteHighlightID}`
        );
        dispatch(setActionMenuToggle(false));
      }
    } catch (e) {
      console.log("Delete fail");
    }
  };

  return (
    <div className={styles.action_menu_container}>
      <div
        className={styles.action_menu}
        style={{
          position: "absolute",
          top: `${yPosition}px`,
          left: `${xPosition}px`,
          zIndex: 100,
        }}
      >
        <div className={styles.action_menu_inner}>
          {isDeleteMode ? (
            <ActionIcon
              iconProp={faTrashCan}
              promptText="Delete highlight"
              position="top"
              onAction={() => handleDeleteHighlight()}
            />
          ) : (
            <ActionIcon
              iconProp={faHighlighter}
              promptText="Create highlight"
              position={isColorPlatteOpen ? "bottom" : "top"}
              onAction={() => handleHighlight()}
              color={markerColor}
            />
          )}

          <ActionIcon
            iconProp={faNoteSticky}
            promptText="Add note"
            position={isColorPlatteOpen ? "bottom" : "top"}
            onAction={() => handleHighlight()}
          />
          <ActionIcon
            iconProp={faEllipsis}
            promptText="Pick marker color"
            position={isColorPlatteOpen ? "bottom" : "top"}
            onAction={() => setIsColorPlatteOpen(!isColorPlatteOpen)}
          />
          {isColorPlatteOpen && <MarkerColorPlatte />}
        </div>
      </div>
    </div>
  );
};

export default ActionMenu;
