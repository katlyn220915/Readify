"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./BookIndices.module.css";

import IndexItemProp from "@/types/IndexItemProp";
import IndexButton from "../IndexButton/IndexButton";

import { useAppSelector } from "@/hooks/redux/hooks";
import parseEpub from "@/server-actions/parseEpub/parseEpub";

const BookIndices = React.memo(
  ({ isContentListOpen }: { isContentListOpen: boolean }) => {
    const { currentBook } = useAppSelector((state) => state.read);
    const [toc, setToc] = useState<null | IndexItemProp[]>();

    const currentBookMemo = useMemo(() => {
      return currentBook;
    }, [currentBook]);
    const parserMemo = useCallback(parseEpub, [parseEpub]);

    useEffect(() => {
      const getBookContents = async () => {
        if (currentBookMemo) {
          const parser = parserMemo();
          const tocList = await parser.getContents(
            currentBookMemo?.bookDownloadURL
          );
          setToc(tocList);
        }
      };
      getBookContents();
      return () => {
        setToc(null);
      };
    }, [currentBookMemo, parserMemo]);

    return (
      <>
        <aside
          className={`${styles.sidebar} ${
            isContentListOpen ? "" : styles.sidebar_close
          }`}
        >
          <div className={styles.contents_wrapper}>
            <p className={styles.title}>{currentBook?.title}</p>
            <div className={styles.contents}>
              {toc &&
                toc.map((toc: IndexItemProp) => (
                  <>
                    <IndexButton contentItem={toc} key={toc.href} />
                    {toc.subitems &&
                      toc.subitems.map((toc) => (
                        <IndexButton
                          contentItem={toc}
                          key={toc.href}
                          isSubitem={true}
                        />
                      ))}
                  </>
                ))}
            </div>
          </div>
        </aside>
      </>
    );
  }
);

BookIndices.displayName = "BookIndices";

export default BookIndices;
