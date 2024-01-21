//Fix bugs
import React, { useState } from "react";
import styles from "./Upload.module.css";

/* COMPONENT */
import UploadingField from "../UploadingField/UploadingField";
import ActionPrompt from "../ActionPrompt/ActionPrompt";

/* CUSTOM_HOOK */
import useFirestore from "@/hooks/firebase_db/useFirestore";
import useEpubJs from "@/hooks/epubjs/useEpubJs";
import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";
import { addNewBook } from "@/lib/redux/features/bookSlice";
import {
  uploading,
  error,
  success,
  reset,
} from "@/lib/redux/features/uploadSlice";
import parseEpub from "@/server-actions/parseEpub/parseEpub";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";

/*TYPE */
import storeFiles from "@/server-actions/store/storeFiles";

export default function UploadFile() {
  const { user } = useAuth();
  const firestore = useFirestore();
  const epubJS = useEpubJs();
  const dispatch = useAppDispatch();
  const { isUploading, isError, errorMes, fileName, isSuccessful } =
    useAppSelector((state) => state.upload);
  const parser = parseEpub();
  const store = storeFiles();

  //修改firebase儲存路徑
  const storeEpubAllImages = async (
    url: string,
    bookId: string,
    uuid: string
  ) => {
    const images = await parser.getImages(url);
    let map = new Map();
    const imagesMap = await Promise.all(
      images.map(async (item) => {
        const downloadURL = await store.storeEpub(
          item?.blob,
          `${uuid}/books/${bookId}/${item?.fileName}`
        );
        map.set(item?.fileName, downloadURL);
      })
    );
    const updateData = {
      images: Object.fromEntries(map),
    };
    firestore.updateDocument(`/users/${uuid}/books`, bookId, updateData);
  };

  const storeBookInfos = async (url: string, bookId: string, uuid: string) => {
    const bookInfos = await epubJS.getBookInfos(url);
    let imgUrl = null;
    console.log(
      "Successfully got the book informations from epubJS：" + bookInfos
    );
    if (bookInfos === undefined) {
      console.error("cannot parse the book: " + bookId);
      return;
    }
    if (bookInfos.coverURL !== null) {
      imgUrl = await storeBookCoverImg(bookInfos?.coverURL, bookId);
    }

    const newBookInfos = {
      title: bookInfos.title,
      category: "mylibrary",
      author: bookInfos.author,
      bookId,
      bookDownloadURL: url,
      tags: [],
      coverURL: imgUrl,
      images: {},
    };
    firestore.setDocument(`users/${uuid}/books`, bookId, newBookInfos);
    dispatch(addNewBook(newBookInfos));
    storeEpubAllImages(url, bookId, uuid);
  };

  const storeBookCoverImg = async (coverURL: string, id: string) => {
    try {
      const file = await fetch(coverURL)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], id, { type: blob.type });
          return file;
        });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", id);

      const res = await fetch("/api/upload_img", {
        method: "POST",
        body: formData,
        headers: {
          "X-user-UUID": user.uid,
        },
      });
      if (!res.ok) return;
      const result = await res.json();
      return result.data.downloadURL;
    } catch (e) {
      console.error(`Uploading coverURL ERROR: book-${id} `);
    }
  };

  const upload = async (fileList: FileList) => {
    dispatch(reset());
    if (fileList[0].type !== "application/epub+zip") {
      dispatch(error("Incorrect data type"));
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
      return;
    }

    try {
      dispatch(uploading(fileList[0].name));
      const data = new FormData();
      data.set("file", fileList[0]);
      const res = await fetch("/api/upload_epub", {
        method: "POST",
        body: data,
        headers: {
          "X-user-UUID": user.uid,
        },
      });
      if (!res.ok) dispatch(error("Upload fail"));
      const result = await res.json();
      console.log("Upload successfully, server response:", result);
      storeBookInfos(result.data.downloadURL, result.data.id, user.uid);
      dispatch(success());

      setTimeout(() => {
        dispatch(reset());
      }, 5000);
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <>
      <div className={styles.upload_container}>
        <form>
          <label htmlFor="upload_epub" className={styles.label}>
            <input
              id="upload_epub"
              name="epub"
              type="file"
              onChange={(e) => {
                console.log(e.target.value);
                if (e.target.files && e.target.files.length > 0) {
                  upload(e.target.files);
                } else {
                  console.log("上傳資料錯誤");
                  return;
                }
              }}
              className={styles.input}
            />
            <FontAwesomeIcon
              icon={faArrowUpFromBracket}
              className={styles.btn}
            />
          </label>
        </form>
      </div>
      {isUploading && <UploadingField />}
      {isError ||
        (isSuccessful && (
          <ActionPrompt
            isError={isError}
            errorMes={errorMes}
            isSuccessful={isSuccessful}
            successfulMes="Upload successfully !"
          />
        ))}
    </>
  );
}
