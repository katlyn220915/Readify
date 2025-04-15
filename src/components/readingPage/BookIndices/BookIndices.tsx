"use client";

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";

import ActionIcon from "@/components/common/ActionIcon/ActionIcon";
import { useAppSelector } from "@/hooks/redux/hooks";
import parseEpub from "@/server-actions/parseEpub/parseEpub";
import IndexItemProp from "@/types/IndexItemProp";

import IndexButton from "../IndexButton/IndexButton";
import styles from "./BookIndices.module.css";

const BookIndices = React.memo(
  ({
    isContentListOpen,
    onContentListOpen,
  }: {
    isContentListOpen: boolean;
    onContentListOpen: Dispatch<SetStateAction<boolean>>;
  }) => {
    const { currentBook } = useAppSelector((state) => state.read);
    const [tocs, setTocs] = useState<null | IndexItemProp[]>();

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
          setTocs(tocList);
        }
      };
      getBookContents();
      return () => {
        setTocs(null);
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
            <p className={styles.title}>
              <span>{currentBook?.title}</span>
              <ActionIcon
                iconProp={faXmark}
                promptText="Close the contents"
                position="left"
                showPrompt={false}
                onAction={() => onContentListOpen(false)}
              />
            </p>
            <div className={styles.contents}>
              {tocs &&
                tocs.map((toc: IndexItemProp) => (
                  <>
                    <IndexButton contentItem={toc} key={toc.href} />
                    {toc.subitems &&
                      toc.subitems.map((subToc) => (
                        <IndexButton
                          contentItem={subToc}
                          key={subToc.id}
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
