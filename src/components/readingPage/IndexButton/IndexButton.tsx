"use client";

import React from "react";

import { useAuth } from "@/context/AuthContext";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { setCurrentChapter } from "@/lib/redux/features/readSlice";
import IndexItemProp from "@/types/IndexItemProp";
import { decode, scrollIntoScreen } from "@/utils/helper";

import styles from "./IndexButton.module.css";

const IndexButton = ({
  contentItem,
  isSubitem,
}: {
  contentItem: IndexItemProp;
  isSubitem?: boolean;
}) => {
  const { currentChapter, currentBook } = useAppSelector((state) => state.read);
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const firebase = useFirestore();

  return (
    <button
      onClick={() => {
        const decodeedHref = decode(contentItem.href);
        const paragraphElement = document.getElementById(`${decodeedHref}`);
        if (paragraphElement && currentBook?.bookId) {
          scrollIntoScreen(paragraphElement, "start");
          dispatch(setCurrentChapter(decodeedHref));

          firebase.updateDocument(
            `/users/${user.uid}/books`,
            currentBook?.bookId,
            {
              record: decodeedHref,
            }
          );
        }
      }}
      className={`${styles.contentBtn} ${
        currentChapter === decode(contentItem.href)
          ? styles.contentBtn_active
          : ""
      } ${isSubitem ? styles.subitem : ""}`}
    >
      {contentItem.label.trim()}
    </button>
  );
};
export default IndexButton;
