import React from "react";
import styles from "./BookList.module.css";

/* TYPE */
import BookProps from "@/types/BookProps";

/* COMPONENT */
import Spinner from "../Spinner/Spinner";
import Book from "../Book/Book";
import ActionPrompt from "../ActionPrompt/ActionPrompt";

/* CUSTOM-HOOKS */
import { useAppSelector } from "@/hooks/redux/hooks";

/////////////////////////////////////////////////////////

export default function BookList({ bookList }: { bookList: BookProps[] }) {
  const { isError, isSuccessful } = useAppSelector((state) => state.book);
  const { isUploadSuccessful } = useAppSelector((state) => state.upload);
  return (
    <>
      <ul className={styles.books}>
        {bookList.map((book: BookProps) => (
          <Book book={book} key={book.bookId} />
        ))}
        {isUploadSuccessful && <Spinner />}
      </ul>
      <ActionPrompt
        isError={isError}
        isSuccessful={isSuccessful}
        isPending={false}
      >
        {isError
          ? "Delete file fail"
          : isSuccessful
          ? "Delete successfully"
          : ""}
      </ActionPrompt>
    </>
  );
}
