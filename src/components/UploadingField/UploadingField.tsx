import React from "react";
import styles from "./UploadingField.module.css";

import { useAppSelector } from "@/hooks/redux/hooks";

export default function UploadingField({}) {
  const { fileName, isUploading } = useAppSelector((state) => state.upload);
  return (
    <>
      <div
        className={`${styles.container} ${isUploading ? styles.uploading : ""}`}
      >
        <p>Uploading ...</p>
        <p>
          Title:{" "}
          {fileName.length <= 15
            ? fileName
            : fileName.slice(0, 14).concat("...")}
        </p>
      </div>
    </>
  );
}
