import React, { useState } from "react";
import styles from "./Upload.module.css";
import Image from "next/image";

import useFirebaseAuth from "@/hooks/firebase_auth/useFirebaseAuth";
import useEpubJs from "@/hooks/epubjs/useEpubJs";
import getFileURL from "@/server-actions/getFile/getFile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function UploadFile() {
  const [file, setFile] = useState<File>();
  const [src, setSrc] = useState<any>(null);
  const firebseAuth = useFirebaseAuth();
  const epubJS = useEpubJs();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    const userUUID = await firebseAuth.getCurrentUser();

    if (userUUID !== null && userUUID !== undefined) {
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
        const cloudFileUrl = await getFileURL(
          `${userUUID.uid}/books/${result.data.id}/${result.data.id}.epub`
        );

        if (cloudFileUrl !== undefined) {
          const bookInfos = await epubJS.getBookInfos(cloudFileUrl);
          console.log(bookInfos);
          setSrc(bookInfos?.coverURL);
        }
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.error("UserUUID is null or undifined");
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
      {src && <Image src={src} alt="photo" width={100} height={100} />}
    </div>
  );
}
