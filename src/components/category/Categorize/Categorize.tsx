import React, { Dispatch, SetStateAction } from "react";

import { faClock } from "@fortawesome/free-regular-svg-icons";
/* THIRD_LIB */
import {
  faArchive,
  faBookOpen,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

import ActionIcon from "@/components/common/ActionIcon/ActionIcon";
import { useRWD } from "@/hooks/useRWD/useRWD";
/* CUSTOM HOOK */
import BookProps from "@/types/BookProps";
import TagProps from "@/types/TagProps";

import { CategorizeItem } from "../CategorizeItem/CategorizeItem";
/* COMPONENT */
import MoreActionList from "../MoreActionList/MoreActionList";
import styles from "./Categorize.module.css";

const staticItems = [
  {
    title: "Move to My Library",
    iconProp: faBookOpen,
    path: "mylibrary",
  },
  {
    title: "Move to Later",
    iconProp: faClock,
    path: "later",
  },
  {
    title: "Move to Archive",
    iconProp: faArchive,
    path: "archive",
  },
];

export default function Categorize({
  book,
  tags,
  onAddTag,
  activeListId,
  onActiveListId,
}: {
  book: BookProps;
  tags: TagProps[];
  onAddTag: Dispatch<SetStateAction<TagProps[]>>;
  activeListId: string | null;
  onActiveListId: (id: string | null) => void;
}) {
  return (
    <>
      <div className={styles.categorize_container}>
        <div
          className={styles.more_act_box}
          onClick={(e) => {
            e.stopPropagation();
            if (activeListId !== null) onActiveListId(null);
            else onActiveListId(book.bookId);
          }}
        >
          <ActionIcon
            iconProp={faEllipsis}
            promptText="More actions"
            position="top"
            onAction={() => {}}
          />
        </div>
        <ul className={styles.categorize_box}>
          {staticItems.map((item) => (
            <CategorizeItem item={item} key={item.path} book={book} />
          ))}
        </ul>
        {activeListId === book.bookId && (
          <MoreActionList book={book} tags={tags} onAddTag={onAddTag} />
        )}
      </div>
    </>
  );
}
