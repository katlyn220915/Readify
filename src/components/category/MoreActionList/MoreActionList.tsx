"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./MoreActionList.module.css";
import { useParams } from "next/navigation";

import EditTagField from "../EditTagField/EditTagField";
import { CategorizeItem } from "../CategorizeItem/CategorizeItem";

import BookProps from "@/types/BookProps";
import TagProps from "@/types/TagProps";

/* Custom_hook */
import { useAppDispatch } from "@/hooks/redux/hooks";
import { deleteBook, resetSuccessful } from "@/lib/redux/features/bookSlice";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import useCloudStorage from "@/hooks/firebase_db/useCloudStorage";
import { useRWD } from "@/hooks/useRWD/useRWD";
import { useAuth } from "@/context/AuthContext";

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
  opendBookId,
}: {
  book: BookProps;
  tags: TagProps[];
  onAddTag: Dispatch<SetStateAction<TagProps[]>>;
  opendBookId?: string;
}) {
  const [isAddTagFieldOpen, setIsAddTagFieldOpen] = useState(false);
  const [categoryList, setCategoryList] = useState<any[]>();
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
    } else {
    }
  };

  useEffect(() => {
    setCategoryList(staticItems.filter((cur) => cur.path !== book.category));

    return () => {};
  }, [params.category, screenWidth, book.category]);

  return (
    <>
      <div className={styles.more_action} onClick={(e) => e.stopPropagation()}>
        {!isAddTagFieldOpen && (
          <>
            {screenWidth < 1024 &&
              categoryList &&
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
