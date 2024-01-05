"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./ReadingNavigation.module.css";

import ActionIcon from "../ActionIcon/ActionIcon";
import {
  faList,
  faFont,
  faCircleArrowLeft,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import CustomStylePlatte from "../CustomStylePlatte/CustomStylePlatte";

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
  const router = useRouter();
  const pathname = usePathname();

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
          <ActionIcon
            iconProp={faList}
            promptText={
              isContentListOpen ? "Close the sidebar" : "Open the sidebar"
            }
            position="bottom"
            showPrompt={true}
            onAction={() => onSetContentListOpen(!isContentListOpen)}
          />
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
            iconProp={faPenToSquare}
            promptText={isNotebookOpen ? "Close Notebook" : "Open Notebook"}
            position="bottom"
            showPrompt={true}
            onAction={() => onSetNotebookOpen(!isNotebookOpen)}
          />
        </div>
      </nav>
    </>
  );
};

export default ReadingNavigation;
