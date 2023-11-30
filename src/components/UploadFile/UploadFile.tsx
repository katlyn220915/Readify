import React, { useState } from "react";
import styles from "./Upload.module.css";

import useFirebaseAuth from "@/hooks/firebase_auth/useFirebaseAuth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function UploadFile() {
  const [file, setFile] = useState<File>();
  const firebseAuth = useFirebaseAuth();

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
    </div>
  );
}
