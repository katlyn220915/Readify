//Fix bugs
import React, { useState } from "react";
import styles from "./Upload.module.css";

import useFirebaseAuth from "@/hooks/firebase_auth/useFirebaseAuth";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import useEpubJs from "@/hooks/epubjs/useEpubJs";
import { useAppSelector, useAppDispatch } from "@/hooks/redux/hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  uploading,
  error,
  success,
  reset,
} from "@/lib/redux/features/uploadSlice";
import UploadingField from "../UploadingField/UploadingField";
import UploadPrompt from "../UploadPrompt/UploadPrompt";

export default function UploadFile() {
  const firebseAuth = useFirebaseAuth();
  const firestore = useFirestore();
  const epubJS = useEpubJs();
  const dispatch = useAppDispatch();
  const { isUploading, isError, errorMes, fileName, isSuccessful } =
    useAppSelector((state) => state.upload);

  const storeBookInfos = async (url: string, bookId: string, uuid: string) => {
    const bookInfos = await epubJS.getBookInfos(url);
    console.log(
      "Successfully got the book informations from epubJS：" + bookInfos
    );
    const newBookInfos = {
      ...bookInfos,
      bookId,
      bookDownloadURL: url,
      tags: [],
    };
    firestore.setDocument(`users/${uuid}/books`, bookId, newBookInfos);
  };

  const upload = async (fileList: FileList) => {
    dispatch(reset());
    console.log(fileList);
    if (fileList[0].type !== "application/epub+zip") {
      dispatch(error("Incorrect data type"));
      return;
    }

    const userUUID = await firebseAuth.getCurrentUser();
    if (userUUID === null || userUUID === undefined)
      throw new Error("Uid cannot found when uploading page");

    try {
      dispatch(uploading(fileList[0].name));
      /*
      const data = new FormData();
      data.set("file", fileList[0]);
      const res = await fetch("/api/upload_epub", {
        method: "POST",
        body: data,
        headers: {
          "X-user-UUID": userUUID.uid,
        },
      });
      if (!res.ok) dispatch(error("Upload fail"));
      const result = await res.json();
      console.log("Upload successfully, server response:", result);
      storeBookInfos(result.data.downloadURL, result.data.id, userUUID.uid);
      */

      setTimeout(() => {
        dispatch(success());
      }, 3000);

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
      <UploadingField />
      <UploadPrompt />
    </>
  );
}
