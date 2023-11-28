"use client";

import React, { useEffect, useState } from "react";
import styles from "./Topbar.module.css";
import { usePathname } from "next/navigation";

import Icon from "@/components/Icon/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faBoxArchive,
  faMagnifyingGlass,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";

export default function Topbar() {
  const pathname = usePathname();
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState(faBookOpen);

  useEffect(() => {
    setTitle("");
    function changeTitle() {
      if (pathname === "/mylibrary/mybooks") {
        setTitle("My Books");
        setIcon(faBookOpen);
      }
      if (pathname === "/mylibrary/later") {
        setTitle("Later");
        setIcon(faClock);
      }
      if (pathname === "/mylibrary/archive") {
        setTitle("Archive");
        setIcon(faBoxArchive);
      }
      if (pathname === "/mylibrary/search") {
        setTitle("Search");
        setIcon(faMagnifyingGlass);
      }
    }
    changeTitle();
    return () => changeTitle();
  }, [pathname]);

  return (
    <div className={styles.topbar}>
      <div className={styles.title}>
        <Icon path="/mybooks" iconProp={icon} />
        <h3 className="heading__tertiary">{title}</h3>
      </div>
      <div className={styles.tools}>
        <span>
          <FontAwesomeIcon icon={faTags} className="icon" />
          Manage tags
        </span>
      </div>
    </div>
  );
}
