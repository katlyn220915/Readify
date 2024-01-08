"use client";
import { useState } from "react";
import styles from "./ActionMenu.module.css";

import ActionIcon from "../ActionIcon/ActionIcon";
import MarkerColorPlatte from "../MarkerColorPlatte/MarkerColorPlatte";
import NoteForm from "../NoteForm/NoteForm";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { setDeleteHighlightMode } from "@/lib/redux/features/readSlice";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import {
  setActionMenuToggle,
  setIsAddNoteBlockOpen,
} from "@/lib/redux/features/readSlice";
import {
  addHighlight,
  deleteHighlight,
  upDateNote,
} from "@/lib/redux/features/noteSlice";

import getSelectionData from "@/utils/getSelectionData";

import {
  faHighlighter,
  faNoteSticky,
  faEllipsis,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { fromRange } from "xpath-range";
import highlightHelper from "@/utils/highlightHelper";
import findChapterElement from "@/utils/findIndexOfParentElement";
import { object } from "yup";

const ActionMenu = ({
  xPosition,
  yPosition,
}: {
  xPosition: number;
  yPosition: number;
}) => {
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
    currentBook,
    currentCategory,
    currentChapter,
  } = useAppSelector((state) => state.read);

  const pathname = usePathname();
  const arrPath = pathname.split("/");
  const category = arrPath[1];
  const bookId = arrPath[arrPath.length - 1];

  const { highlightList } = useAppSelector((state) => state.note);
  const { user } = useAuth();

  const handleHighlight = async () => {
    const selectionData = getSelectionData();
    if (selectionData) {
      const { range, startContainer, endContainer, selectedText } =
        selectionData;
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
        markerColor
      );

      if (currentChapter) {
        await firestore.setDocument(
          `/users/${user.uid}/${category}/${bookId}/highlights`,
          `${currentChapter.replaceAll("/", "")}`,
          {
            [highlightId]: {
              id: highlightId,
              markerColor,
              text: selectedText,
              range: xpath,
              note: "",
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
      console.log("目前點擊的highlightId :", highlightId);
    } else {
      setCurrentHighlightId(deleteHighlightID);
      setIsNew(false);
      const index = highlightList.findIndex(
        (cur) => cur.id === deleteHighlightID
      );
      setNote(highlightList[index].note);

      console.log("目前點擊的highlightId :", deleteHighlightID);
    }
  };

  const handleDeleteHighlight = async () => {
    try {
      console.log("目前要刪除的highlight id :", currentHighlightId);
      let id = deleteHighlightID;
      if (!id) {
        id = currentHighlightId;
      }
      if (id && currentChapter) {
        const highlight = highlightHelper();
        highlight.deleteHighlight(id);
        await firestore.deleteColumn(
          `/users/${user.uid}/${category}/${bookId}/highlights`,
          `${currentChapter.replaceAll("/", "")}`,
          id
        );
        dispatch(deleteHighlight(id));
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
    </div>
  );
};

export default ActionMenu;
