import React from "react";
import styles from "./ActionPrompt.module.css";

type ActionPromptPropsType = {
  isError: boolean;
  errorMes: string | undefined;
  isSuccessful: boolean;
  successfulMes: string;
};

export default function ActionPrompt({
  isError,
  errorMes,
  isSuccessful,
  successfulMes,
}: ActionPromptPropsType) {
  // const { isUploading, isError, errorMes, fileName, isSuccessful } =
  //   useAppSelector((state) => state.upload);
  return (
    <div
      className={`${styles.container} ${isError ? styles.error : ""} ${
        isSuccessful ? styles.successful : ""
      }`}
    >
      <p>{isError ? errorMes : successfulMes}</p>
    </div>
  );
}
