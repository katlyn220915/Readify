"use client";

import React, { useEffect, useState } from "react";
import styles from "./topbar.module.css";
import { usePathname } from "next/navigation";

import Icon from "@/components/Icon/Icon";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

export default function Topbar() {
  const pathname = usePathname();
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle("");
    function changeTitle() {
      if (pathname === "/mylibrary/mybooks") setTitle("My Books");
      if (pathname === "/mylibrary/later") setTitle("Later");
      if (pathname === "/mylibrary/archive") setTitle("Archive");
      if (pathname === "/mylibrary/search") setTitle("Search");
    }
    changeTitle();
    return () => changeTitle();
  }, [pathname]);

  return (
    <div className={styles.topbar}>
      <div className={styles.title}>
        <Icon path="/mybooks" iconProp={faBookOpen} />
        <h3 className="heading__tertiary">{title}</h3>
      </div>
      <div className={styles.tools}>
        <span>Manage tags</span>
        <span>Filter</span>
      </div>
    </div>
  );
}
