import React from "react";
import styles from "./ContentsRoot.module.css";

import BookMark from "../BookMark/BookMark";
import ActionMenu from "../ActionMenu/ActionMenu";
import BookContents from "../BookContents/BookContents";

const ContentsRoot = ({
  bookDocuments,
}: {
  bookDocuments: any[];
  bookMark: any;
}) => {
  return (
    <>
      <div className={styles.root} id="contentRoot">
        <ActionMenu />
        <BookMark />
        <BookContents bookDocuments={bookDocuments} />
      </div>
    </>
  );
};

export default ContentsRoot;
