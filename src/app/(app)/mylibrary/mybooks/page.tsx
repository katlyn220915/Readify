"use client";

import React, { useEffect } from "react";
import styles from "./page.module.css";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Spinner from "@/components/Spinner/Spinner";
import Icon from "@/components/Icon/Icon";
import Topbar from "@/components/Topbar/Topbar";

const bookList = [
  {
    id: "123235232",
    title: "原子習慣:細微改變帶來巨大成就的實證法則",
    author: "詹姆斯.克利爾",
    tags: ["自我成長", "心理學"],
    img: "/image/Atom-habbit.png",
  },
  {
    id: "21432739534",
    title: "心流",
    author: "Mihaly Csikszentmihalyi",
    tags: ["自我成長", "心理學"],
    img: "/image/Atom-habbit.png",
  },
];

const tags = [
  {
    tagName: "自我成長",
    books: ["原子習慣", "心流"],
  },
];

export default function Mybooks() {
  const { isLogin, pending } = useAuth();
  const router = useRouter();

  return (
    <>
      <div className={styles.container}>
        <Topbar />
        <ul className={styles.books}>
          {bookList.map((item) => (
            <li key={item.id} className={`${styles.book}`}>
              <div className={styles.img_container}>
                <Image
                  src={`${item.img}`}
                  alt={`book-${item.title}`}
                  width={80}
                  height={80}
                />
              </div>
              <div className={styles.book_intro}>
                <h3>{item.title}</h3>
                <div className={styles.book_row}>
                  <p className={styles.author}>作者：{item.author}</p>
                  {item.tags.map((tag, id) => (
                    <span key={`${id}+ ${item.id}`} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
