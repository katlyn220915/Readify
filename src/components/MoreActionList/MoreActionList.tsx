"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./MoreActionList.module.css";
import { useParams } from "next/navigation";

import EditTagField from "../EditTagField/EditTagField";

import BookProps from "@/types/BookProps";
import TagProps from "@/types/TagProps";

/* Custom_hook */
import { useAppDispatch } from "@/hooks/redux/hooks";
import { deleteBook, resetSuccessful } from "@/lib/redux/features/bookSlice";
import { setMoreActionBtnClose } from "@/lib/redux/features/moreActionSlice";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import useCloudStorage from "@/hooks/firebase_db/useCloudStorage";
import { useAuth } from "@/context/AuthContext";
import { useRWD } from "@/hooks/useRWD/useRWD";
import { CategorizeItem } from "../CategorizeItem/CategorizeItem";

const staticItems = [
  {
    title: "Move to MyLibrary",
    path: "mylibrary",
  },
  {
    title: "Move to Later",
    path: "later",
  },
  {
    title: "Move to Archive",
    path: "archive",
  },
];

export default function MoreActionList({
  book,
  tags,
  onAddTag,
}: {
  book: BookProps;
  tags: TagProps[];
  onAddTag: Dispatch<SetStateAction<TagProps[]>>;
}) {
  const [isAddTagFieldOpen, setIsAddTagFieldOpen] = useState(false);
  const [categoryList, setCategoryList] = useState<any[]>(staticItems);
  const params = useParams<{ category: string }>();
  const { screenWidth } = useRWD();
  const dispatch = useAppDispatch();
  const firestore = useFirestore();
  const cloudStorage = useCloudStorage();
  const { user } = useAuth();

  const handleDelete = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const isDataDeletedFromStore = await firestore.deleteDocument(
      `users/${user.uid}/books/${book.bookId}`
    );

    if (isDataDeletedFromStore) {
      await cloudStorage.deleteFiles(
        `${user.uid}/books/${book.bookId}/${book.bookId}`
      );
      dispatch(deleteBook(book.bookId));
      setTimeout(() => dispatch(resetSuccessful()), 3000);
      dispatch(setMoreActionBtnClose());
    } else {
    }
  };

  useEffect(() => {
    setCategoryList((prev) =>
      prev.filter((cur) => cur.path !== params.category)
    );
  }, [params.category, screenWidth]);

  return (
    <>
      <div className={styles.more_action} onClick={(e) => e.stopPropagation()}>
        {!isAddTagFieldOpen && (
          <>
            {screenWidth < 700 &&
              categoryList.map((item) => (
                <CategorizeItem key={item.path} item={item} book={book} />
              ))}
            <button
              onClick={(e) => {
                setIsAddTagFieldOpen(true);
              }}
            >
              Add new tag
            </button>
            <button
              className={styles.delete_btn}
              onClick={(e) => handleDelete(e)}
            >
              Delete this book
            </button>
          </>
        )}
        {isAddTagFieldOpen && (
          <EditTagField tags={tags} onAddTag={onAddTag} bookId={book.bookId} />
        )}
      </div>
    </>
  );
}
