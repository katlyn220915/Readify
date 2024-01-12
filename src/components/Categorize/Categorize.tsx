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

const staticItems = [
  {
    title: "Move to MyLibrary",
    iconProp: faBookOpen,
    path: "/mylibrary",
  },
  {
    title: "Move to Later",
    iconProp: faClock,
    path: "/later",
  },
  {
    title: "Move to Archive",
    iconProp: faArchive,
    path: "/archive",
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

function CategorizeItem({
  item,
  book,
}: {
  item: { title: string; iconProp: any; path: string };
  book: BookProps;
}) {
  const { user } = useAuth();
  const firestore = useFirestore();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isCurrentCategory = pathname === item.path;

  const handleCategorizeBook = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (pathname === item.path) return;
    const isSetDocSuccess = await firestore.setDocument(
      `users/${user.uid}/${item.path.split("/").pop()}`,
      book.bookId,
      book
    );
    const isDeleteDocSuccess = await firestore.deleteDocument(
      `/users/${user.uid}/${pathname.split("/").pop()}/${book.bookId}`
    );

    if (isSetDocSuccess && isDeleteDocSuccess) {
      dispatch(deleteBook(book.bookId));
      dispatch(resetSuccessful());
    }
  };
  return (
    <>
      <li
        className={`${styles.li} ${
          isCurrentCategory ? styles.current_path : ""
        }`}
        onClick={(e) => handleCategorizeBook(e)}
      >
        <ActionIcon
          iconProp={item.iconProp}
          promptText={item.title}
          position="top"
          showPrompt={!isCurrentCategory}
          onAction={() => {}}
          color={`${isCurrentCategory ? "grey-600" : "grey-300"}`}
        />
      </li>
    </>
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
  tags: string[] | null;
  onAddTag: Dispatch<SetStateAction<string[]>>;
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
