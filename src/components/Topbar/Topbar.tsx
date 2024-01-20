"use client";

import React, { useEffect, useState } from "react";
import styles from "./Topbar.module.css";
import { usePathname, useSearchParams } from "next/navigation";

import Icon from "@/components/Icon/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBookOpen,
  faBoxArchive,
  faMagnifyingGlass,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import ManageTags from "../ManageTags/ManageTags";
import { useRWD } from "@/hooks/useRWD/useRWD";

export default function Topbar() {
  const [isManageTagsOpen, setIsManageTagsOpen] = useState(false);
  const { screenWidth } = useRWD();
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
      <div
        className={styles.tools}
        onClick={() => {
          setIsManageTagsOpen(!isManageTagsOpen);
        }}
      >
        <span
          className={`${styles.tool} ${
            isManageTagsOpen ? styles.tool_active : ""
          }`}
        >
          <FontAwesomeIcon icon={faTags} className="icon" />
          {screenWidth > 700 && "Manage tags"}
        </span>
        {screenWidth < 700 && (
          <span className={styles.tool}>
            <FontAwesomeIcon icon={faBars} className="icon" />
          </span>
        )}
        {isManageTagsOpen && <ManageTags />}
      </div>
    </div>
  );
}
