import React, { Dispatch, SetStateAction } from "react";
import styles from "./MobileMoreActionList.module.css";

import ActionIcon from "@/components/Common/ActionIcon/ActionIcon";
import MoreActionList from "../MoreActionList/MoreActionList";

import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import BookProps from "@/types/BookProps";
import TagProps from "@/types/TagProps";

export const MobileMoreActionList = ({
  book,
  tags,
  onSetTags,
  onActiveListId,
  activeListId,
}: {
  book: BookProps;
  tags: any;
  onSetTags: Dispatch<SetStateAction<TagProps[]>>;
  activeListId: string | null;
  onActiveListId: (id: string | null) => void;
}) => {
  return (
    <span
      className={styles.mobile_moreAction_btn}
      onClick={(e) => {
        e.stopPropagation();
        if (activeListId === null || activeListId !== book.bookId) {
          onActiveListId(book.bookId);
        } else {
          onActiveListId(null);
        }
      }}
    >
      <ActionIcon
        iconProp={faEllipsis}
        promptText="More Actions"
        showPrompt={false}
        position="right"
      />
      {activeListId === book.bookId && (
        <MoreActionList book={book} tags={tags} onAddTag={onSetTags} />
      )}
    </span>
  );
};
