import React from "react";

import staticSidebarItems from "../../../../public/data/staticSidebarItems";
import SidebarItem from "../SidebarItem/SidebarItem";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <nav className={styles.nav}>
      {staticSidebarItems.map((item) => (
        <SidebarItem item={item} key={item.path} />
      ))}
    </nav>
  );
}
