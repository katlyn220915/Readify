"use client";

import React, { useState } from "react";
import styles from "./StaticSidebarList.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Prompt from "../Prompt/Prompt";

import {
  faBookOpen,
  faBoxArchive,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ListItemProps = {
  item: { title: string; path: string; iconProp: any };
};

const staticList = [
  {
    title: "My Library",
    path: "mylibrary",
    iconProp: faBookOpen,
  },
  {
    title: "Later",
    path: "later",
    iconProp: faClock,
  },
  {
    title: "Archive",
    path: "archive",
    iconProp: faBoxArchive,
  },
  {
    title: "Search",
    path: "search",
    iconProp: faMagnifyingGlass,
  },
];

function ListItem({ item }: ListItemProps) {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const pathName = usePathname();
  const arrPathname = pathName.split("/");
  const category = arrPathname[arrPathname.length - 1];

  return (
    <button
      className={`${styles.action_btn}`}
      onMouseEnter={() => {
        setIsMouseEnter(true);
      }}
      onMouseLeave={() => {
        setIsMouseEnter(false);
      }}
      data-iscurrentpath={category === item.path}
    >
      <Link href={item.path}>
        <span className={styles.tablet_text}>{item.title}</span>
        <span className={styles.desktop_icon}>
          <FontAwesomeIcon icon={item.iconProp} />
          <Prompt isMouseEnter={isMouseEnter} position="right">
            {item.title}
          </Prompt>
        </span>
      </Link>
    </button>
  );
}

export default function StaticSidebarList() {
  return (
    <nav className={styles.nav}>
      {staticList.map((item) => (
        <ListItem item={item} key={item.path} />
      ))}
    </nav>
  );
}
