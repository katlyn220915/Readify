import React from "react";
import styles from "./StaticSidebarList.module.css";
import Icon from "../Icon/Icon";

import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

type ListItemProps = {
  item: { path: string; iconProp: any };
};

const staticList = [
  {
    path: "/mybooks",
    iconProp: faBookOpen,
  },
  {
    path: "/later",
    iconProp: faClock,
  },
  {
    path: "/archive",
    iconProp: faBoxArchive,
  },
  {
    path: "/search",
    iconProp: faMagnifyingGlass,
  },
];

function ListItem({ item }: ListItemProps) {
  return (
    <li>
      <Icon path={`/mylibrary${item.path}`} iconProp={item.iconProp} />
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
