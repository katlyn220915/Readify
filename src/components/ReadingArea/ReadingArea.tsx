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
import Book, { NavItem } from "epubjs";

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
  const [rendition, setRedition] = useState<any>();

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

            newBook?.ready.then(async () => {
              const navigation = newBook.navigation;
              console.log(navigation.toc);
              setToc(navigation.toc);
              //   const spine = newBook.spine;
              //   console.log(spine);
              //   spine.each(async (item: any, i: any) => {
              //     console.log(item.canonical);
              //   });
            });
          }
        }
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    bookRender();
  }, [user]);

  function handleNext(rendition: any) {
    rendition.next();
  }

  return (
    <>
      {isLoading && <Spinner />}
      <ul>
        <>
          {toc !== null ? (
            toc.map((item: { id: string; href: string; label: string }) => (
              <Content item={item} key={item.id} />
            ))
          ) : (
            <p>No content</p>
          )}
        </>
      </ul>
    </>
  );
}

function Content({
  item,
}: {
  item: { id: string; href: string; label: string };
}) {
  return (
    <li>
      <a href={item.href}>{item.label}</a>
    </li>
  );
}
