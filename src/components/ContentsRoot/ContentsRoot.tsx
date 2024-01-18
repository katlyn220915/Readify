import React from "react";
import styles from "./ContentsRoot.module.css";

import BookMark from "../BookMark/BookMark";
import ActionMenu from "../ActionMenu/ActionMenu";
import BookContents from "../Contents/BookContents";

const ContentsRoot = ({ bookDocuments }: { bookDocuments: any[] }) => {
  return (
    <>
      <div className={styles.root}>
        <ActionMenu />
        <BookMark />
        <BookContents bookDocuments={bookDocuments} />
      </div>
    </>
  );
};

export default ContentsRoot;
