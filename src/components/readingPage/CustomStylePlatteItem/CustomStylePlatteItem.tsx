"use client";

import { Dispatch, SetStateAction } from "react";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ActionIcon from "@/components/common/ActionIcon/ActionIcon";
import { useAppDispatch } from "@/hooks/redux/hooks";
import { setFontSize, setLineSpacing } from "@/lib/redux/features/readSlice";

import styles from "./CustomStylePlatteItem.module.css";

const CustomStylePlatteItem = ({
  iconProp,
  customItemName,
  value,
  onTypefaceListOpen,
}: {
  iconProp: any;
  customItemName: string;
  value: number | string;
  onTypefaceListOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className={styles.text_styles_item}>
      <div className={styles.text_styles_item_name}>
        <FontAwesomeIcon icon={iconProp} className="icon" />
        <span>{customItemName}</span>
      </div>
      <div className={styles.text_styles_item_function}>
        <span className={styles.text_styles_item_function_value}>{value}</span>
        <CustomStylePlatteAction
          customItemName={customItemName}
          onTypefaceListOpen={onTypefaceListOpen}
        />
      </div>
    </div>
  );
};

export default CustomStylePlatteItem;

const CustomStylePlatteAction = ({
  customItemName,
  onTypefaceListOpen,
}: {
  customItemName: string;
  onTypefaceListOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();
  return (
    <>
      {customItemName !== "Typeface" && (
        <span className={styles.text_styles_item_function_upDown}>
          <button
            onClick={() => {
              if (customItemName === "Font size") dispatch(setFontSize(1));
              if (customItemName === "Line spacing")
                dispatch(setLineSpacing(1));
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              if (customItemName === "Font size") dispatch(setFontSize(0));
              if (customItemName === "Line spacing")
                dispatch(setLineSpacing(0));
            }}
          >
            -
          </button>
        </span>
      )}
      {customItemName === "Typeface" && onTypefaceListOpen !== undefined && (
        <ActionIcon
          iconProp={faChevronRight}
          position="top"
          promptText="Select a typeface"
          showPrompt={false}
          onAction={() => onTypefaceListOpen(true)}
        />
      )}
    </>
  );
};
