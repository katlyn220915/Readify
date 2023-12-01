import React, { useState } from "react";
import styles from "./Upload.module.css";
import Image from "next/image";

import useFirebaseAuth from "@/hooks/firebase_auth/useFirebaseAuth";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import useEpubJs from "@/hooks/epubjs/useEpubJs";
import getFileURL from "@/server-actions/getFile/getFile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

type infoProps = {
  author: string;
  coverURL: string | null;
  title: string;
};

export default function UploadFile() {
  const [file, setFile] = useState<File>();
  const [src, setSrc] = useState<string | null>();
  const firebseAuth = useFirebaseAuth();
  const firestore = useFirestore();
  const epubJS = useEpubJs();

  const storeBookInfos = async (url: string, bookId: string, uuid: string) => {
    const bookInfos = await epubJS.getBookInfos(url);
    console.log("成功拿取書籍資訊：" + bookInfos);
    firestore.setDocument(`users/${uuid}/books`, bookId, bookInfos);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const userUUID = await firebseAuth.getCurrentUser();
    if (userUUID === null || userUUID === undefined)
      throw new Error("Uid cannot found when uploading page");

    try {
      const data = new FormData();
      data.set("file", file);
      const res = await fetch("/api/upload_epub", {
        method: "POST",
        body: data,
        headers: {
          "X-user-UUID": userUUID.uid,
        },
      });
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();
      console.log("上傳成功，next server回應：", result);
      storeBookInfos(result.data.downloadURL, result.data.id, userUUID.uid);
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <div className={styles.upload_container}>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0])}
          className={styles.input}
          id="upload"
        />
        <button>
          <FontAwesomeIcon icon={faArrowUpFromBracket} />
        </button>
      </form>
      {src && <Image src={src} alt={"photo"} width={100} height={100} />}
    </div>
  );
}
