import React from "react";
import styles from "./ReadingAreaNav.module.css";

import ActionIcon from "../ActionIcon/ActionIcon";
import { faList, faFont } from "@fortawesome/free-solid-svg-icons";

const ReadingAreaNav = ({
  isContentListOpen,
  onSetContentListOpen,
}: {
  isContentListOpen: boolean;
  onSetContentListOpen<SetStateAction>(boolean: any): any;
}) => {
  const handleOpenCutomizeBox = () => {};
  return (
    <>
      <nav className={styles.readingArea_nav}>
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
          onAction={handleOpenCutomizeBox}
        />
      </nav>
      <div className={styles.empty_block}></div>
    </>
  );
};

export default ReadingAreaNav;
