import React from "react";
import styles from "./ContentsRoot.module.css";

import BookMark from "../BookMark/BookMark";
import ActionMenu from "../ActionMenu/ActionMenu";
import BookContents from "../Contents/BookContents";
import { useRWD } from "@/hooks/useRWD/useRWD";

const ContentsRoot = ({
  bookDocuments,
  bookMark,
}: {
  bookDocuments: any[];
  bookMark: any;
}) => {
  const { screenWidth } = useRWD();
  return (
    <>
      <div className={styles.root} id="contentRoot">
        <ActionMenu />
        <BookMark bookMark={bookMark} />
        <BookContents bookDocuments={bookDocuments} />
      </div>
    </>
  );
};

export default ContentsRoot;
