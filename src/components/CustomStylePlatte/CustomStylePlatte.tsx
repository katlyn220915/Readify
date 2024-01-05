import React from "react";
import styles from "./CustomStylePlatte.module.css";

import CustomStylePlatteItem from "../CustomStylePlatteItem/CustomStylePlatteItem";

import {
  faFont,
  faTextHeight,
  faArrowsUpDown,
  faArrowsLeftRight,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/hooks/redux/hooks";

export default function CustomStylePlatte() {
  const { fontSize, lineSpacing, lineWidth } = useAppSelector(
    (state) => state.read
  );
  return (
    <div className={styles.custom_styles_field}>
      <p>Text styles</p>
      <div className={styles.text_styles_box}>
        {/* <CustomStylePlatteItem
          iconProp={faFont}
          customItemName="Typeface"
          value="Literata"
        /> */}
        <CustomStylePlatteItem
          iconProp={faTextHeight}
          customItemName="Font size"
          value={`${fontSize}px`}
        />
        <CustomStylePlatteItem
          iconProp={faArrowsUpDown}
          customItemName="Line spacing"
          value={lineSpacing}
        />
        {/* <CustomStylePlatteItem
          iconProp={faArrowsLeftRight}
          customItemName="Line width"
          value={lineWidth}
        /> */}
      </div>
    </div>
  );
}
