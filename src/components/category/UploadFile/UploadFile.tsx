//Fix bugs
import React, { useState } from "react";

import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/* COMPONENT */
import ActionPrompt from "@/components/common/ActionPrompt/ActionPrompt";
import { useAuthContext } from "@/context";
import useEpubJs from "@/hooks/epubjs/useEpubJs";
/* CUSTOM_HOOK */
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { addNewBook } from "@/lib/redux/features/bookSlice";
import {
  error,
  reset,
  success,
  uploading,
} from "@/lib/redux/features/uploadSlice";
import parseEpub from "@/server-actions/parseEpub/parseEpub";
/*TYPE */
import storeFiles from "@/server-actions/store/storeFiles";

import styles from "./Upload.module.css";

export default function UploadFile() {
  const { user } = useAuthContext();
  const firestore = useFirestore();
  const epubJS = useEpubJs();
  const dispatch = useAppDispatch();
  const {
    isUploading,
    isUploadError,
    uploadErrorMes,
    isUploadSuccessful,
    fileName,
  } = useAppSelector((state) => state.upload);
  const parser = parseEpub();
  const store = storeFiles();

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
      dispatch(error("The file type nees to be Epub"));
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
      return;
    }

    try {
      dispatch(uploading(fileList[0].name));
      const data = new FormData();
      data.set("file", fileList[0]);
      const response = await fetch("/api/upload_epub", {
        method: "POST",
        body: data,
        headers: {
          "X-user-UUID": user.uid,
        },
      });
      if (!response.ok) {
        dispatch(
          error("sorry, server got too many request today, come back tomorrow")
        );
      } else {
        const result = await response.json();
        storeBookInfos(result.data.downloadURL, result.data.id, user.uid);
        setTimeout(() => {
          dispatch(success());
        }, 3000);
      }
    } catch (e: any) {
      dispatch(error("Something wrong on the server, just try again later!"));
    } finally {
      setTimeout(() => {
        dispatch(reset());
      }, 4000);
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
                if (e.target.files && e.target.files.length > 0) {
                  upload(e.target.files);
                } else {
                  dispatch(error("Upload failed, try again later"));
                  setTimeout(() => {
                    dispatch(reset());
                  }, 4000);
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
      <ActionPrompt
        isError={isUploadError}
        isSuccessful={isUploadSuccessful}
        isPending={isUploading}
        fileName={fileName}
      >
        {isUploadError
          ? `Oh-oh...,${uploadErrorMes}!`
          : isUploadSuccessful
            ? "Upload successfully!"
            : isUploading
              ? `Uploading the book - ${fileName}`
              : ""}
      </ActionPrompt>
    </>
  );
}
