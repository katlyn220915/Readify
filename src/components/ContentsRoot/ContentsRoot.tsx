import React from "react";
import styles from "./ContentsRoot.module.css";

import BookMark from "../BookMark/BookMark";
import ActionMenu from "../ActionMenu/ActionMenu";
import BookContents from "../Contents/BookContents";

const ContentsRoot = ({
  bookDocuments,
  bookMark,
}: {
  bookDocuments: any[];
  bookMark: any;
}) => {
  return (
    <>
      <div className={styles.root}>
        <ActionMenu />
        <BookMark bookMark={bookMark} />
        <BookContents bookDocuments={bookDocuments} />
      </div>
    </>
  );
};

export default ContentsRoot;
