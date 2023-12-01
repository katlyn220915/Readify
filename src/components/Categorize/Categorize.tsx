"use client";

import React, { useState } from "react";
import styles from "./Categorize.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faArchive,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import Prompt from "../Prompt/Prompt";

const staticItems = [
  {
    title: "Move to MyBooks",
    iconProp: faBookOpen,
  },
  {
    title: "Move to Later",
    iconProp: faClock,
  },
  {
    title: "Move to Archive",
    iconProp: faArchive,
  },
];

function MoreActionBtn() {
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  return (
    <div className={styles.more_act_box}>
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

function CategorizeItem({ item }: { item: { title: string; iconProp: any } }) {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  return (
    <>
      <li className={styles.li}>
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
      <Prompt isMouseEnter={isMouseEnter} position="top">
        {item.title}
      </Prompt>
    </>
  );
}

export default function Categorize({
  isMouseEnter,
}: {
  isMouseEnter: boolean;
}) {
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
        </div>
      )}
    </>
  );
}
