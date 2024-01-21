import React, { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import styles from "./Categorize.module.css";

/* COMPONENT */
import MoreActionList from "../MoreActionList/MoreActionList";

/* THIRD_LIB */
import {
  faBookOpen,
  faArchive,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

/* CUSTOM HOOK */
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { setMoreActionBtn } from "@/lib/redux/features/moreActionSlice";
import { deleteBook, resetSuccessful } from "@/lib/redux/features/bookSlice";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAuth } from "@/context/AuthContext";
import BookProps from "@/types/BookProps";
import ActionIcon from "../ActionIcon/ActionIcon";
import BookId from "@/app/(mylibrary)/[category]/read/[bookId]/page";
import TagProps from "@/types/TagProps";
import { CategorizeItem } from "../CategorizeItem/CategorizeItem";

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

function MoreActionBtn() {
  const dispatch = useAppDispatch();

  return (
    <div
      className={styles.more_act_box}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setMoreActionBtn());
      }}
    >
      <ActionIcon
        iconProp={faEllipsis}
        promptText="More actions"
        position="top"
        onAction={() => {}}
      />
    </div>
  );
}

export default function Categorize({
  isMouseEnter,
  book,
  tags,
  onAddTag,
}: {
  isMouseEnter: boolean;
  book: BookProps;
  tags: TagProps[];
  onAddTag: Dispatch<SetStateAction<TagProps[]>>;
}) {
  const { isMoreActionBtnOpen } = useAppSelector((state) => state.moreAction);
  return (
    <>
      {isMouseEnter && (
        <div className={styles.categorize_container}>
          <MoreActionBtn />
          <ul className={styles.categorize_box}>
            {staticItems.map((item) => (
              <CategorizeItem item={item} key={item.path} book={book} />
            ))}
          </ul>
          {isMoreActionBtnOpen && (
            <MoreActionList book={book} tags={tags} onAddTag={onAddTag} />
          )}
        </div>
      )}
    </>
  );
}
