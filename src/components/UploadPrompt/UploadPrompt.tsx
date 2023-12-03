import React from "react";
import styles from "./UploadPrompt.module.css";

import { useAppSelector } from "@/hooks/redux/hooks";

export default function UploadPrompt() {
  const { isUploading, isError, errorMes, fileName, isSuccessful } =
    useAppSelector((state) => state.upload);
  return (
    <div
      className={`${styles.container} ${isError ? styles.error : ""} ${
        isSuccessful ? styles.successful : ""
      }`}
    >
      <p>{isError ? errorMes : "Upload successfully !"}</p>
    </div>
  );
}
