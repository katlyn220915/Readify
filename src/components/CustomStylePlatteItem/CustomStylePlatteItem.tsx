"use client";

import styles from "./CustomStylePlatteItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import {
  setFontSize,
  setLineSpacing,
  setLineWidth,
} from "@/lib/redux/features/readSlice";

const CustomStylePlatteItem = ({
  iconProp,
  customItemName,
  value,
}: {
  iconProp: any;
  customItemName: string;
  value: number | string;
}) => {
  return (
    <div className={styles.text_styles_item}>
      <div className={styles.text_styles_item_name}>
        <FontAwesomeIcon icon={iconProp} className="icon" />
        <span>{customItemName}</span>
      </div>
      <div className={styles.text_styles_item_function}>
        <span className={styles.text_styles_item_function_value}>{value}</span>
        <CustomStylePlatteAction customItemName={customItemName} />
      </div>
    </div>
  );
};

export default CustomStylePlatteItem;

const CustomStylePlatteAction = ({
  customItemName,
}: {
  customItemName: string;
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
    </>
  );
};
