"use client";
import React, { useEffect, useState } from "react";
import styles from "./Book.module.css";
import { useParams, useRouter } from "next/navigation";
/* TYPE */
import BookProps from "@/types/BookProps";

/* COMPONENT */
import Categorize from "../Categorize/Categorize";
import TagAction from "@/components/common/TagAction/TagAction";

/* THIRD-LIB */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

/* CUSTOM-HOOKS */
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { reset } from "@/lib/redux/features/tagSlice";
import TagProps from "@/types/TagProps";
import useTag from "@/hooks/createTag/useTag";
import { useRWD } from "@/hooks/useRWD/useRWD";
import { BookCover } from "../BookCover/BookCover";
import { MobileMoreActionList } from "../MobileMoreActionList/MobileMoreActionList";

const Book = ({
  book,
  activeBookId,
  onActiveBook,
  activeListId,
  onActiveListId,
}: {
  book: BookProps;
  activeBookId: string | null;
  onActiveBook: (id: string) => void;
  activeListId: string | null;
  onActiveListId: (id: string | null) => void;
}) => {
  const [tags, setTags] = useState<TagProps[]>(book.tags);

  const { screenWidth } = useRWD();
  const url = useParams<{ category: string }>();
  const router = useRouter();
  const { deleteTagFromBookCached, updateTagNameFromBookCached } = useTag();

  const dispatch = useAppDispatch();
  const { deleteId, updateId, updateName } = useAppSelector(
    (state) => state.tag
  );

  useEffect(() => {
    if (tags && deleteId) {
      const isContainDeletedTag = tags.filter((cur) => cur.id === deleteId);
      if (isContainDeletedTag.length > 0) {
        setTags((prev) => prev.filter((cur) => cur.id !== deleteId));
        deleteTagFromBookCached(
          book.bookId,
          tags.filter((cur) => cur.id !== deleteId)
        );
        dispatch(reset());
      }
    }
  }, [deleteId, book.bookId, dispatch, tags, deleteTagFromBookCached]);

  useEffect(() => {
    if (tags && updateId) {
      const isContainUpdateId = tags.filter((cur) => cur.id === updateId);
      if (isContainUpdateId.length > 0) {
        const oldName = isContainUpdateId[0].name;
        setTags((prev) => prev.filter((cur) => cur.id !== updateId));
        setTags((prev) => [
          ...prev,
          {
            id: updateId,
            name: updateName,
          },
        ]);
        updateTagNameFromBookCached(book.bookId, updateId, oldName, updateName);
        dispatch(reset());
      }
    }
  }, [
    updateId,
    dispatch,
    book.bookId,
    tags,
    updateName,
    updateTagNameFromBookCached,
  ]);

  return (
    <li
      className={`${styles.book} ${
        activeBookId === book.bookId ? styles.book_active : ""
      }`}
      onMouseEnter={() => {
        if (screenWidth > 1024 && activeListId === null)
          onActiveBook(book.bookId);
      }}
      onClick={() => {
        router.push(`${url.category}/read/${book.bookId}`);
      }}
    >
      {screenWidth <= 1024 && (
        <MobileMoreActionList
          book={book}
          tags={tags}
          onSetTags={setTags}
          activeListId={activeListId}
          onActiveListId={onActiveListId}
        />
      )}
      <BookCover coverUrl={book.coverURL} title={book.title} />
      <div className={styles.book_intro}>
        <h3>{book.title}</h3>
        <div className={styles.book_row}>
          <p className={styles.author}>
            <FontAwesomeIcon icon={faFeather} className="icon" />
            <span>{book.author}</span>
          </p>
          <div className={styles.tags}>
            {tags &&
              tags.map((tag) => (
                <TagAction
                  onAction={(e) => {
                    e.stopPropagation();
                  }}
                  key={tag.id}
                  tag={tag}
                  mode="search"
                />
              ))}
          </div>
        </div>
      </div>
      {activeBookId === book.bookId && screenWidth > 1024 && (
        <Categorize
          book={book}
          tags={tags}
          onAddTag={setTags}
          activeListId={activeListId}
          onActiveListId={onActiveListId}
        />
      )}
    </li>
  );
};

export default Book;
