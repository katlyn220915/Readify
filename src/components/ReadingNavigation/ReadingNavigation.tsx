"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./ReadingNavigation.module.css";

import ActionIcon from "../ActionIcon/ActionIcon";
import CustomStylePlatte from "../CustomStylePlatte/CustomStylePlatte";

import {
  faList,
  faFont,
  faCircleArrowLeft,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import useBook from "@/hooks/useBook/useBook";
import ActionPrompt from "../ActionPrompt/ActionPrompt";
import { useRWD } from "@/hooks/useRWD/useRWD";

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
  const [isClick, setIsClick] = useState(false);
  const [isCustomizeBoxOpen, setIsCustomizeBoxOpen] = useState(false);
  const [isStoreBookMarkError, setIsStoreBookMarkError] = useState(false);
  const [isStoreBookMarkSuccess, setIsStoreBookMarkSuccess] = useState(false);
  const { screenWidth } = useRWD();
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
          className={`${styles.menuToggle} ${isClick ? styles.active : ""}`}
          onClick={() => setIsClick(!isClick)}
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
      {isStoreBookMarkError ||
        (isStoreBookMarkSuccess && (
          <ActionPrompt
            isError={isStoreBookMarkError}
            errorMes="Click a paragraph to add book mark"
            isSuccessful={isStoreBookMarkSuccess}
            successfulMes="Book mark added"
          />
        ))}
    </>
  );
};

export default ReadingNavigation;

// const MobileNavigation = () => {
//   const [isClick, setIsClick] = useState(false);

//   return (

//   );
// };
