"use client";
import { useState } from "react";
import styles from "./ActionMenu.module.css";

import ActionIcon from "../ActionIcon/ActionIcon";
import MarkerColorPlatte from "../MarkerColorPlatte/MarkerColorPlatte";

import { useAuth } from "@/context/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { setActionMenuToggle } from "@/lib/redux/features/readSlice";

import findIndexOfParentElement from "@/utils/findIndexOfParentElement";
import getSelectionData from "@/utils/getSelectionData";

import {
  faHighlighter,
  faNoteSticky,
  faEllipsis,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

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
      const { parent, selectedText } = selectionData;
      console.log(parent);
      const randomString = Math.random().toString(36).substring(2);
      const pattern = new RegExp(selectedText, "g");
      if (parent) {
        parent.innerHTML = parent.innerHTML.replace(
          pattern,
          `<span class="epub_highlight" style='background-color: var(--color-${markerColor})' data-highlight-id=${randomString}>${selectedText}</span>`
        );
        dispatch(setActionMenuToggle(false));
        const data = findIndexOfParentElement(parent);

        firestore.setDocument(
          `/users/${user.uid}/${currentCategory}/${
            currentBook?.bookId
          }/${data.chapterID.replace("/", "")}`,
          `${randomString}`,
          {
            highlightId: randomString,
            indexOfTag: data.indexOfParentElement,
            markerColor,
            tagName: parent.tagName,
            text: selectedText,
          }
        );
      }
    }
  };

  const deleteHighlight = async () => {
    try {
      const deleteEl = document.querySelector(
        `[data-highlight-id="${deleteHighlightID}"]`
      );
      await firestore.deleteDocument(
        `/users/${user.uid}/${currentCategory}/${
          currentBook?.bookId
        }/${currentChapter?.replace("/", "")}/${deleteHighlightID}`
      );
      const parent = deleteEl?.parentElement;
      if (
        parent !== undefined &&
        parent !== null &&
        deleteEl &&
        deleteEl.textContent
      ) {
        parent.innerHTML = parent?.innerHTML.replace(
          deleteEl?.outerHTML,
          deleteEl?.textContent
        );
      }
      dispatch(setActionMenuToggle(false));
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
              onAction={() => deleteHighlight()}
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
