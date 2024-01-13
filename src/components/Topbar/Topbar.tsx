"use client";

import React, { useEffect, useState } from "react";
import styles from "./Topbar.module.css";
import { usePathname, useSearchParams } from "next/navigation";

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
  const params = useSearchParams();
  const tag = params.get("tag");

  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState(faBookOpen);

  useEffect(() => {
    setTitle("");
    function changeTitle() {
      if (pathname === "/mylibrary") {
        setTitle("My Library");
        setIcon(faBookOpen);
      }
      if (pathname === "/later") {
        setTitle("Later");
        setIcon(faClock);
      }
      if (pathname === "/archive") {
        setTitle("Archive");
        setIcon(faBoxArchive);
      }
      if (pathname === "/search") {
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
        <Icon path={pathname} iconProp={icon} />
        <h3 className="heading__tertiary">{title}</h3>
        {tag && pathname === "/search" && <span>tag: {tag}</span>}
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
