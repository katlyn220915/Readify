"use client";
import React, { useEffect, useState } from "react";
import styles from "./BookContent.module.css";

import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import parseEpub from "@/server-actions/parseEpub/parseEpub";

type ContentItemProp = {
  id: string | number;
  label: string;
  href: string;
};

export default function BookContent() {
  const { currentBook } = useAppSelector((state) => state.read);
  const [toc, setToc] = useState<null | ContentItemProp[]>();
  const parser = parseEpub();

  useEffect(() => {
    const getBookContents = async () => {
      if (currentBook) {
        const tocList = await parser.getContents(currentBook?.bookDownloadURL);
        setToc(tocList);
      }
    };
    getBookContents();
  }, [currentBook]);

  return (
    <div className={styles.contents}>
      {toc &&
        toc.map((toc: ContentItemProp) => (
          <ContentButton contentItem={toc} key={toc.href} />
        ))}
    </div>
  );
}

const ContentButton = ({ contentItem }: { contentItem: ContentItemProp }) => {
  return (
    <button
      onClick={() => {
        const decodeedHref = decodeURIComponent(contentItem.href)
          .replaceAll(" ", "")
          .replace(/\.(xhtml|html).*/, "");
        console.log("click", decodeedHref);
        const paragraphElement = document.getElementById(`${decodeedHref}`);
        console.log(paragraphElement);
        if (paragraphElement) {
          paragraphElement.scrollIntoView({ behavior: "smooth" });
        }
      }}
      className={styles.contentBtn}
    >
      {contentItem.label}
    </button>
  );
};
