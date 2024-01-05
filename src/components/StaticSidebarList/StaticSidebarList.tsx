"use client";

import React, { LiHTMLAttributes, useState } from "react";
import styles from "./StaticSidebarList.module.css";
import Icon from "../Icon/Icon";

import {
  faBookOpen,
  faBoxArchive,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import Prompt from "../Prompt/Prompt";

import { usePathname } from "next/navigation";

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
  // {
  //   title: "Search",
  //   path: "search",
  //   iconProp: faMagnifyingGlass,
  // },
];

function ListItem({ item }: ListItemProps) {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const pathName = usePathname();
  const arrPathname = pathName.split("/");
  const category = arrPathname[arrPathname.length - 1];

  return (
    <li
      className={`${styles.li}`}
      onMouseEnter={() => {
        setIsMouseEnter(true);
      }}
      onMouseLeave={() => {
        setIsMouseEnter(false);
      }}
      data-iscurrentpath={category === item.path}
    >
      <Icon path={item.path} iconProp={item.iconProp} />
      <Prompt isMouseEnter={isMouseEnter} position="right">
        {item.title}
      </Prompt>
    </li>
  );
}

export default function StaticSidebarList() {
  return (
    <ul className={styles.ul}>
      {staticList.map((item) => (
        <ListItem item={item} key={item.path} />
      ))}
    </ul>
  );
}
