import React from "react";
import styles from "./CategorizeItem.module.css";
import { usePathname } from "next/navigation";

import ActionIcon from "../ActionIcon/ActionIcon";
import BookProps from "@/types/BookProps";
import { useAuth } from "@/context/AuthContext";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAppDispatch } from "@/hooks/redux/hooks";
import { deleteBook, resetSuccessful } from "@/lib/redux/features/bookSlice";
import { useRWD } from "@/hooks/useRWD/useRWD";

export const CategorizeItem = ({
  item,
  book,
}: {
  item: { title: string; iconProp?: any; path: string };
  book: BookProps;
}) => {
  const { user } = useAuth();
  const { screenWidth } = useRWD();
  const firestore = useFirestore();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isCurrentCategory = pathname === item.path;

  const handleCategorizeBook = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (pathname === item.path) return;
    await firestore.updateDocument(`users/${user.uid}/books`, book.bookId, {
      category: item.path.split("/").pop(),
    });
    dispatch(deleteBook(book.bookId));
    dispatch(resetSuccessful());
  };
  return (
    <>
      {screenWidth > 700 && (
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
      )}
      {screenWidth <= 700 && (
        <button onClick={(e) => handleCategorizeBook(e)}>{item.title}</button>
      )}
    </>
  );
};
