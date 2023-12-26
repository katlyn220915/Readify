"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./ReadingAreaNav.module.css";

import ActionIcon from "../ActionIcon/ActionIcon";
import {
  faList,
  faFont,
  faCircleArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import CustomStylePlatte from "../CustomStylePlatte/CustomStylePlatte";

const ReadingAreaNav = ({
  isContentListOpen,
  onSetContentListOpen,
}: {
  isContentListOpen: boolean;
  onSetContentListOpen<SetStateAction>(boolean: any): any;
}) => {
  const [isCustomizeBoxOpen, setIsCustomizeBoxOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <nav className={styles.readingArea_nav}>
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
      </nav>
      {/* <div className={styles.empty_block}></div> */}
      {isCustomizeBoxOpen && <CustomStylePlatte />}
    </>
  );
};

export default ReadingAreaNav;
