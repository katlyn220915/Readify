"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./ReadingNavigation.module.css";

import CustomStylePlatte from "../CustomStylePlatte/CustomStylePlatte";
import ActionIcon from "@/components/Common/ActionIcon/ActionIcon";
import ActionPrompt from "@/components/Common/ActionPrompt/ActionPrompt";

import useBook from "@/hooks/useBook/useBook";
import {
  faList,
  faFont,
  faCircleArrowLeft,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

const ReadingNavigation = ({
  isContentListOpen,
  onSetContentListOpen,
  isNotebookOpen,
  onSetNotebookOpen,
}: {
  isContentListOpen: boolean;
  onSetContentListOpen<SetStateAction>(boolean: any): any;
  isNotebookOpen: boolean;
  onSetNotebookOpen<SetStateAction>(boolean: any): any;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCustomizeBoxOpen, setIsCustomizeBoxOpen] = useState(false);
  const [isStoreBookMarkError, setIsStoreBookMarkError] = useState(false);
  const [isStoreBookMarkSuccess, setIsStoreBookMarkSuccess] = useState(false);
  const { storeBookMark } = useBook();
  const router = useRouter();
  const pathname = usePathname();

  const addBookMark = () => {
    const indicator = document.querySelector("[data-indicator]") as HTMLElement;
    if (indicator) {
      storeBookMark(indicator);
      setIsStoreBookMarkSuccess(true);

      setTimeout(() => setIsStoreBookMarkSuccess(false), 3000);
    } else {
      setIsStoreBookMarkError(true);
      setTimeout(() => setIsStoreBookMarkError(false), 3000);
    }
  };

  return (
    <>
      <div className={styles.navigation}>
        <div
          className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        ></div>
        <div className={styles.menu}>
          <div className={styles.actionList}>
            <ActionIcon
              iconProp={faList}
              promptText={
                isContentListOpen ? "Close the sidebar" : "Open the sidebar"
              }
              position="top"
              showPrompt={true}
              onAction={() => onSetContentListOpen(!isContentListOpen)}
            />
            <ActionIcon
              iconProp={faFont}
              promptText="Customize styles"
              position="top"
              showPrompt={true}
              onAction={() => setIsCustomizeBoxOpen(!isCustomizeBoxOpen)}
            />

            <ActionIcon
              iconProp={faCircleArrowLeft}
              promptText="Go back to list"
              position="top"
              onAction={() => {
                const category = pathname.split("/")[1];
                router.push(`/${category}`);
              }}
            />
            <ActionIcon
              iconProp={faBookmark}
              promptText="Add book mark"
              position="top"
              showPrompt={true}
              onAction={() => {
                addBookMark();
              }}
            />
            <ActionIcon
              iconProp={faPenToSquare}
              promptText={isNotebookOpen ? "Close Notebook" : "Open Notebook"}
              position="top"
              showPrompt={true}
              onAction={() => onSetNotebookOpen(!isNotebookOpen)}
            />
          </div>
        </div>
        {isCustomizeBoxOpen && <CustomStylePlatte />}
      </div>
      <ActionPrompt
        isError={isStoreBookMarkError}
        isSuccessful={isStoreBookMarkSuccess}
        isPending={false}
      >
        {isStoreBookMarkError
          ? "Click a paragraph to add book mark"
          : isStoreBookMarkSuccess
          ? "Book mark added!"
          : ""}
      </ActionPrompt>
    </>
  );
};

export default ReadingNavigation;
