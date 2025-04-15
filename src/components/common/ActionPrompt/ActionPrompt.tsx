import React, { useEffect, useState } from "react";

import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./ActionPrompt.module.css";

type ActionPromptPropsType = {
  isError: boolean;
  isSuccessful: boolean;
  isPending: boolean;
  fileName?: string;
  children: string;
};

export default function ActionPrompt({
  isError,
  isSuccessful,
  isPending,
  children,
}: ActionPromptPropsType) {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (isSuccessful || isError || isPending) {
      const timeId = setTimeout(() => {
        setIsShow(true);
      }, 10);

      const timeIdClose = setTimeout(() => {
        setIsShow(false);
      }, 3000);

      return () => {
        clearTimeout(timeId);
        clearTimeout(timeIdClose);
      };
    }
  }, [isSuccessful, isError, isPending]);

  return (
    <>
      <div
        className={` ${styles.prompt_box} ${
          isShow ? styles.prompt_box_show : styles.prompt_box_hidden
        } ${isError ? styles.error : ""} ${
          isSuccessful ? styles.successful : ""
        }`}
      >
        <span>
          <FontAwesomeIcon icon={isError ? faCircleXmark : faCircleCheck} />
        </span>
        {<p>{children}</p>}
      </div>

      {isPending && (
        <div
          className={`${
            isShow ? styles.prompt_box_show : styles.prompt_box_hidden
          } ${isPending ? styles.isPending : ""}`}
        >
          {<p>{children}</p>}
        </div>
      )}
    </>
  );
}
