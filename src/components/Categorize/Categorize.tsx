"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./Categorize.module.css";

/* COMPONENT */
import MoreActionList from "../MoreActionList/MoreActionList";
import Prompt from "../Prompt/Prompt";

/* THIRD_LIB */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faArchive,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

/* CUSTOM HOOK */
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import {
  setMoreActionBtn,
  setMoreActionBtnClose,
} from "@/lib/redux/features/moreActionSlice";
import { deleteBook, resetSuccessful } from "@/lib/redux/features/bookSlice";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAuth } from "@/context/AuthContext";
import BookProps from "@/types/BookProps";

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
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div
      className={styles.more_act_box}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(setMoreActionBtn());
      }}
    >
      <button
        className={styles.btn_add_tag}
        onMouseEnter={() => {
          setIsMouseEnter(true);
        }}
        onMouseLeave={() => {
          setIsMouseEnter(false);
        }}
      >
        <FontAwesomeIcon icon={faEllipsis} className="icon" />
      </button>
      <Prompt isMouseEnter={isMouseEnter} position="top">
        More actions
      </Prompt>
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
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const { user } = useAuth();
  const firestore = useFirestore();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const handleCategorizeBook = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (pathname === item.path) return;
    const arrPath = item.path.split("/");
    const newCategory = arrPath[arrPath.length - 1];
    const arrPathname = pathname.split("/");
    const originCategory = arrPathname[arrPathname.length - 1];
    const isSetDocSuccess = await firestore.setDocument(
      `users/${user.uid}/${newCategory}`,
      book.bookId,
      book
    );
    const isDeleteDocSuccess = await firestore.deleteDocument(
      `/users/${user.uid}/${originCategory}/${book.bookId}`
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
          pathname === item.path ? styles.current_path : ""
        }`}
        onClick={(e) => handleCategorizeBook(e)}
      >
        <button
          onMouseEnter={() => {
            setIsMouseEnter(true);
          }}
          onMouseLeave={() => {
            setIsMouseEnter(false);
          }}
        >
          <FontAwesomeIcon icon={item.iconProp} className="icon" />
        </button>
      </li>
      {pathname !== item.path && (
        <Prompt isMouseEnter={isMouseEnter} position="top">
          {item.title}
        </Prompt>
      )}
    </>
  );
}

export default function Categorize({
  isMouseEnter,
  book,
}: {
  isMouseEnter: boolean;
  book: BookProps;
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
          {isMoreActionBtnOpen && <MoreActionList book={book} />}
        </div>
      )}
    </>
  );
}
