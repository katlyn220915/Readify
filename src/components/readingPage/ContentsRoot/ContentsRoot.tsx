import React from "react";

import ActionMenu from "../ActionMenu/ActionMenu";
import BookContents from "../BookContents/BookContents";
import BookMark from "../BookMark/BookMark";
import styles from "./ContentsRoot.module.css";

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
        <BookContents bookDocuments={bookDocuments} />
        <BookMark />
      </div>
    </>
  );
};

export default ContentsRoot;
