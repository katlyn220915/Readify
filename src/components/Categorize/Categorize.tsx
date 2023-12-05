"use client";
import React, { useState } from "react";
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
import { setMoreActionBtn } from "@/lib/redux/features/moreActionSlice";

const staticItems = [
  {
    title: "Move to MyBooks",
    iconProp: faBookOpen,
    path: "/mylibrary/mybooks",
  },
  {
    title: "Move to Later",
    iconProp: faClock,
    path: "/mylibrary/later",
  },
  {
    title: "Move to Archive",
    iconProp: faArchive,
    path: "/mylibrary/archive",
  },
];

function MoreActionBtn() {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div
      className={styles.more_act_box}
      onClick={(e) => {
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
}: {
  item: { title: string; iconProp: any; path: string };
}) {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <li
        className={`${styles.li} ${
          pathname === item.path ? styles.current_path : ""
        }`}
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
  bookId,
}: {
  isMouseEnter: boolean;
  bookId: string;
}) {
  const { isMoreActionBtnOpen } = useAppSelector((state) => state.moreAction);
  return (
    <>
      {isMouseEnter && (
        <div className={styles.categorize_container}>
          <MoreActionBtn />
          <ul className={styles.categorize_box}>
            {staticItems.map((item) => (
              <CategorizeItem item={item} key={item.title} />
            ))}
          </ul>
          {isMoreActionBtnOpen && <MoreActionList bookId={bookId} />}
        </div>
      )}
    </>
  );
}
