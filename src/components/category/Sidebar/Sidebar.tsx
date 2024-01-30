import React from "react";
import styles from "./Sidebar.module.css";
import SidebarItem from "../SidebarItem/SidebarItem";
import staticSidebarItems from "../../../../public/data/staticSidebarItems";

export default function Sidebar() {
  return (
    <nav className={styles.nav}>
      {staticSidebarItems.map((item) => (
        <SidebarItem item={item} key={item.path} />
      ))}
    </nav>
  );
}
