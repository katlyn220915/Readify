"use client";
import { useEffect, useState } from "react";
import styles from "./ActionMenu.module.css";

import ActionIcon from "@/components/common/ActionIcon/ActionIcon";
import MarkerColorPlatte from "../MarkerColorPlatte/MarkerColorPlatte";
import NoteForm from "../NoteForm/NoteForm";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { setDeleteHighlightMode } from "@/lib/redux/features/readSlice";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { setActionMenuToggle } from "@/lib/redux/features/readSlice";
import { addHighlight, deleteHighlight } from "@/lib/redux/features/noteSlice";

import getSelectionData from "@/utils/getSelectionData";
import highlightHelper from "@/utils/highlightHelper";

import {
  faHighlighter,
  faNoteSticky,
  faEllipsis,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { fromRange } from "xpath-range";

const ActionMenu = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isColorPlatteOpen, setIsColorPlatteOpen] = useState(false);
  const [isAddNoteBlockOpen, setIsAddNoteBlockOpen] = useState(false);
  const [currentHighlightId, setCurrentHighlightId] = useState("");
  const [note, setNote] = useState("");
  const [isNew, setIsNew] = useState(false);
  const firestore = useFirestore();
  const dispatch = useAppDispatch();
  const {
    markerColor,
    isDeleteMode,
    deleteHighlightID,
    currentChapter,
    isActionMenuOpen,
  } = useAppSelector((state) => state.read);

  const bookId = usePathname().split("/").pop();
  const { highlightList } = useAppSelector((state) => state.note);
  const { transform } = useAppSelector((state) => state.bookMark);
  const { user } = useAuth();

  const handleHighlight = async () => {
    const selectionData = getSelectionData();
    if (selectionData) {
      const {
        range,
        startContainer,
        endContainer,
        selectedText,
        commonAncestorContainer,
      } = selectionData;
      const root = document.querySelector("#viewer");
      const xpath = fromRange(range, root);
      const { start, startOffset, end, endOffset } = xpath;
      const highlightId = Math.random().toString(36).substring(2);
      const highlight = highlightHelper();

      await highlight.highlightText(
        startContainer,
        endContainer,
        startOffset,
        endOffset,
        highlightId,
        markerColor,
        commonAncestorContainer
      );

      if (currentChapter) {
        await firestore.setDocument(
          `/users/${user.uid}/books/${bookId}/highlights`,
          `${currentChapter.replaceAll("/", "")}`,
          {
            [highlightId]: {
              id: highlightId,
              markerColor,
              text: selectedText,
              range: xpath,
              note: "",
              chapter: currentChapter,
            },
          }
        );
        setCurrentHighlightId(highlightId);
        dispatch(
          setDeleteHighlightMode({
            isDeleteMode: true,
            deleteHighlightID: highlightId,
          })
        );
        dispatch(
          addHighlight({ id: highlightId, text: selectedText, markerColor })
        );
      }
      return highlightId;
    }
  };

  const handleAddNote = async () => {
    setIsAddNoteBlockOpen(true);
    if (!deleteHighlightID) {
      const highlightId = await handleHighlight();
      if (highlightId) {
        setCurrentHighlightId(highlightId);
        setIsNew(true);
      }
    } else {
      setCurrentHighlightId(deleteHighlightID);
      setIsNew(false);
      const index = highlightList.findIndex(
        (cur) => cur.id === deleteHighlightID
      );
      setNote(highlightList[index].note);
    }
  };

  const handleDeleteHighlight = async () => {
    try {
      let id = deleteHighlightID;
      if (!id) {
        id = currentHighlightId;
      }
      if (id && currentChapter) {
        const highlight = highlightHelper();
        highlight.deleteHighlight(id);
        await firestore.deleteColumn(
          `/users/${user.uid}/books/${bookId}/highlights`,
          `${currentChapter.replaceAll("/", "")}`,
          id
        );
        dispatch(deleteHighlight(id));
        dispatch(setActionMenuToggle(false));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const { rec } = getSelectionData() || { rec: null };
    const rootRec = document
      .getElementById("contentRoot")
      ?.getBoundingClientRect();
    if (isActionMenuOpen && rec && rootRec) {
      setPositionX(rec.left - rootRec.left + rec.width / 2 - 55);
      setPositionY(Math.abs(rootRec.top) + rec.top - 38);
      setIsMenuOpen(true);
    } else if (isActionMenuOpen && !rec && rootRec) {
      const contentElement = document.querySelector(".epub_document");
      if (contentElement) setPositionX(contentElement.clientWidth / 2 - 55);
      setPositionY(transform - 38);
      setIsMenuOpen(true);
    } else if (!isActionMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isActionMenuOpen, transform, deleteHighlightID]);

  return (
    <>
      {isMenuOpen && (
        <div
          className={styles.action_menu}
          style={{
            transform: `translate(${positionX}px, ${positionY}px)`,
          }}
        >
          {isAddNoteBlockOpen && (
            <NoteForm
              onIsAddNoteBlockOpen={setIsAddNoteBlockOpen}
              currentHighlightId={currentHighlightId}
              isFirstTime={isNew}
              onDeleteHighlight={handleDeleteHighlight}
              note={note}
            />
          )}
          {!isAddNoteBlockOpen && (
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
                onAction={() => handleAddNote()}
              />
              <ActionIcon
                iconProp={faEllipsis}
                promptText="Pick marker color"
                position={isColorPlatteOpen ? "bottom" : "top"}
                onAction={() => setIsColorPlatteOpen(!isColorPlatteOpen)}
              />
              {isColorPlatteOpen && <MarkerColorPlatte />}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ActionMenu;
