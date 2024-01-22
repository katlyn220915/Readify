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
  isNavigationVisible,
}: {
  isContentListOpen: boolean;
  onSetContentListOpen<SetStateAction>(boolean: any): any;
  isNotebookOpen: boolean;
  onSetNotebookOpen<SetStateAction>(boolean: any): any;
  isNavigationVisible: boolean;
}) => {
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

  useEffect(() => {
    if (!isNavigationVisible) setIsCustomizeBoxOpen(false);
  }, [isNavigationVisible]);

  return (
    <>
      <nav
        className={styles.readingArea_nav}
        style={{
          transform: `translate(${
            isNavigationVisible ? "50%,0" : "50%,-100px"
          })`,
        }}
      >
        <div className={styles.list}>
          <ActionIcon
            iconProp={faCircleArrowLeft}
            promptText="Go back to list"
            position="bottom"
            onAction={() => {
              const category = pathname.split("/")[1];
              router.push(`/${category}`);
            }}
          />
          {screenWidth > 1024 && (
            <ActionIcon
              iconProp={faList}
              promptText={
                isContentListOpen ? "Close the sidebar" : "Open the sidebar"
              }
              position="bottom"
              showPrompt={true}
              onAction={() => onSetContentListOpen(!isContentListOpen)}
            />
          )}

          <ActionIcon
            iconProp={faFont}
            promptText="Customize styles"
            position="bottom"
            showPrompt={true}
            onAction={() => setIsCustomizeBoxOpen(!isCustomizeBoxOpen)}
          />
          {isCustomizeBoxOpen && <CustomStylePlatte />}
        </div>
        <div className={styles.right_btn_wrapper}>
          <ActionIcon
            iconProp={faBookmark}
            promptText="Add book mark"
            position="bottom"
            showPrompt={true}
            onAction={() => {
              addBookMark();
            }}
          />
          {screenWidth < 1024 && (
            <ActionIcon
              iconProp={faList}
              promptText={
                isContentListOpen ? "Close the sidebar" : "Open the sidebar"
              }
              position="bottom"
              showPrompt={true}
              onAction={() => {
                onSetContentListOpen(!isContentListOpen);
                if (isNotebookOpen && !isContentListOpen) {
                  onSetNotebookOpen(false);
                }
              }}
            />
          )}
          <ActionIcon
            iconProp={faPenToSquare}
            promptText={isNotebookOpen ? "Close Notebook" : "Open Notebook"}
            position="bottom"
            showPrompt={true}
            onAction={() => {
              onSetNotebookOpen(!isNotebookOpen);
              if (screenWidth < 1024 && isContentListOpen) {
                onSetContentListOpen(false);
              }
            }}
          />
        </div>
      </nav>
      <ActionPrompt
        isError={isStoreBookMarkError}
        errorMes="Click a paragraph to add book mark"
        isSuccessful={isStoreBookMarkSuccess}
        successfulMes="Book mark added"
      />
    </>
  );
};

export default ReadingNavigation;
