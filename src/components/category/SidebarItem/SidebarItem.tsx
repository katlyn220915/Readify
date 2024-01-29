"use client";

import React, { useState } from "react";
import styles from "./SidebarItem.module.css";
import { useParams } from "next/navigation";
import Link from "next/link";

import Prompt from "@/components/Common/Prompt/Prompt";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRWD } from "@/hooks/useRWD/useRWD";

import { ListItemProps } from "@/types/CategoryPage";

function SidebarItem({ item }: { item: ListItemProps }) {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const url = useParams<{ category: string }>();
  const { screenWidth } = useRWD();

  if (screenWidth >= 1024 && item.title === "Home") return <></>;

  return (
    <button
      className={`${styles.action_btn}`}
      onMouseEnter={() => {
        setIsMouseEnter(true);
      }}
      onMouseLeave={() => {
        setIsMouseEnter(false);
      }}
      data-iscurrentpath={url.category === item.path}
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

export default SidebarItem;
