"use client";
import React, { useEffect, useState } from "react";
import styles from "./Book.module.css";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
/* TYPE */
import BookProps from "@/types/BookProps";

/* COMPONENT */
import Categorize from "../Categorize/Categorize";
import MoreActionList from "../MoreActionList/MoreActionList";
import ActionIcon from "@/components/Common/ActionIcon/ActionIcon";
import TagAction from "@/components/Common/TagAction/TagAction";

/* THIRD-LIB */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faFeather } from "@fortawesome/free-solid-svg-icons";

/* CUSTOM-HOOKS */
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import {
  reset,
  setMoreActionBtnClose,
} from "@/lib/redux/features/moreActionSlice";
import TagProps from "@/types/TagProps";
import useTag from "@/hooks/createTag/useTag";
import { useRWD } from "@/hooks/useRWD/useRWD";

const Book = ({
  book,
  activeBookId,
  onActiveBook,
}: {
  book: BookProps;
  activeBookId: string | null;
  onActiveBook: (id: string) => void;
}) => {
  const [isMobileMoreActionListOpen, setIsMobileMoreActionListOpen] =
    useState(false);
  const [tags, setTags] = useState<TagProps[]>(book.tags);

  const { screenWidth } = useRWD();
  const url = useParams<{ category: string }>();
  const router = useRouter();
  const { deleteTagFromBookCached, updateTagNameFromBookCached } = useTag();

  const dispatch = useAppDispatch();
  const { deleteId, updateId, updateName } = useAppSelector(
    (state) => state.moreAction
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
        if (screenWidth > 1024) onActiveBook(book.bookId);
      }}
      onClick={() => {
        dispatch(setMoreActionBtnClose());
        router.push(`${url.category}/read/${book.bookId}`);
      }}
    >
      <span
        className={styles.mobile_moreAction_btn}
        onClick={(e) => {
          e.stopPropagation();
          setIsMobileMoreActionListOpen(!isMobileMoreActionListOpen);
        }}
      >
        <ActionIcon
          iconProp={faEllipsis}
          promptText="More Actions"
          showPrompt={false}
          position="right"
        />

        {isMobileMoreActionListOpen && (
          <MoreActionList book={book} tags={tags} onAddTag={setTags} />
        )}
      </span>
      <div className={styles.img_container}>
        {book.coverURL && (
          <Image
            src={book.coverURL}
            alt={`Book-${book.title}`}
            width={80}
            height={80}
          />
        )}
        {book.coverURL === null && (
          <Image
            src="/image/image-not-found.png"
            alt={`Book-${book.title}`}
            width={80}
            height={80}
          />
        )}
      </div>
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
      {activeBookId === book.bookId && (
        <Categorize book={book} tags={tags} onAddTag={setTags} />
      )}
    </li>
  );
};

export default Book;
