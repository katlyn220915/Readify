"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./ReadingArea.module.css";

import Spinner from "../Spinner/Spinner";

/* HOOKS */
import { usePathname } from "next/navigation";
import useEpub from "@/hooks/epubjs/useEpubJs";
import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import { setCurrentBook } from "@/lib/redux/features/readSlice";
import { useAuth } from "@/context/AuthContext";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import BookProps from "@/types/BookProps";
import Book, { Layout, NavItem } from "epubjs";
import useEpubParser from "@/hooks/parseEpub/useParseEpub";
import useCloudStorage from "@/hooks/firebase_db/useCloudStorage";
import storeFiles from "@/server-actions/store/storeFiles";

export default function ReadingArea() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const arrPath = pathname.split("/");
  const category = arrPath[1];
  const bookId = arrPath[arrPath.length - 1];

  const epub = useEpub();
  const firestore = useFirestore();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { currentBook, content } = useAppSelector((state) => state.read);

  const [location, setLocation] = useState<string | number>(0);
  const [rendition, setRendition] = useState<any>();

  const [toc, setToc] = useState<NavItem[] | null>([]);

  useEffect(() => {
    const bookRender = async () => {
      try {
        setIsLoading(true);
        if (user) {
          //   const data = await firestore.getDocumentById(
          //     `/users/${user.uid}/${category}`,
          //     bookId
          //   );
          const data = {};
          if (data) {
            // const newBook = await epub.renderBook(data.bookDownloadURL);
            const newBook = await epub.renderBook("/data/1701483198064.epub");
            const container = document.querySelector("#viewer");
            // if (newBook) {
            //   const images = await parser.getAllImagesFromEpub(newBook);
            //   images.map(async (item) => {
            //     // await store.storeImage(item?.blob, `${user.uid}/books/${bookId}/${item?.fileName}`);
            //   });
            // }

            // newBook?.ready.then(async () => {
            //   const navigation = newBook.navigation;
            //   const spine = await newBook.spine;
            //   const archive = newBook.archive;
            //   const path = newBook.path;
            //   const correcPath = path.resolve("image/writer.jpg");
            //   console.log(correcPath);

            //   //Spine.each 取得所有章節的href
            //   spine.each(async (item, i) => {
            //     // console.log(item.canonical);
            //     //取得所有章節的document物件
            //     console.log(item);
            //     const doc: any = await newBook.load(item.href);
            //     console.dir(doc);
            //     const imgEl = doc.querySelector("img");
            //     console.log(imgEl);
            //     const src = imgEl.getAttribute("src");
            //     console.log(src);
            //     //要查看這個doc的目錄在哪
            //     // const blob = await archive.getBlob(
            //     //   "/item/image/writer.jpg",
            //     //   "image/jpg"
            //     // );
            //     // console.log(blob);
            //     //將document物件內的所有內容取出
            //     const bodyContent = doc.body.innerHTML;
            //     //新建一個div為章節內容物的容器，id為href（做連結使用）
            //     const chapterDiv = document.createElement("div");
            //     // chapterDiv.id = item.href;
            //     // chapterDiv.innerHTML = bodyContent;
            //     // container?.appendChild(chapterDiv);
            //     //取得內容物所有的img標籤裡頭src path
            //     // const imgNodes = doc.querySelectorAll("img");
            //     // if (imgNodes) {
            //     //   imgNodes.forEach(async (i) => {
            //     //     const imgSrc = i.src;
            //     //     const newSrc = imgSrc.replace(
            //     //       /http:\/\/localhost:3000\/[^\/]*/,
            //     //       ""
            //     //     );
            //     //     console.log(newSrc);
            //     //     const blob = await archive.getBlob("/item/image/cover.jpg");
            //     //     console.log(blob);
            //     //   });
            //     // }
            //   });

            //   //使用archive.getBlob方法拿到檔案的blob

            //   //   console.log(navigation.toc);
            //   //   setToc(navigation.toc);
            //   //   const spine = newBook.spine;
            //   //   console.log(spine);
            //   //   spine.each(async (item: any, i: any) => {
            //   //     console.log(item.href);
            //   //   });

            //   //   const rendition = newBook.renderTo("viewer", {
            //   //     width: "100%",
            //   //     height: "100%",
            //   //     flow: "scrolled-doc",
            //   //   });
            //   //   rendition.themes.register("default_first", {
            //   //     body: {
            //   //       color: "#fff",
            //   //       fontSize: "20px",
            //   //     },
            //   //   });
            //   //   rendition.themes.select("default_first");
            //   //   rendition.display();
            //   //   setRendition(rendition);
            // });
          }
        }
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    bookRender();
  }, [user]);

  return (
    <>
      {isLoading && <Spinner />}
      <div id="epub-viewer">
        <div id="viewer"></div>
      </div>
      <ul style={{ overflow: "auto" }}>
        <>
          {toc !== null ? (
            toc.map((item: { id: string; href: string; label: string }) => (
              <Content item={item} key={item.id} rendition={rendition} />
            ))
          ) : (
            <p>No content</p>
          )}
        </>
      </ul>
    </>
  );
}

//Generate Content of the book
function Content({
  item,
  rendition,
}: {
  item: { id: string; href: string; label: string };
  rendition: any;
}) {
  const handleJumpToCertainPage = (
    rendition: any,
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    rendition.display(item.href);
  };

  return (
    <li>
      <a
        href={item.href}
        onClick={(e) => handleJumpToCertainPage(rendition, e)}
      >
        {item.label}
      </a>
    </li>
  );
}
