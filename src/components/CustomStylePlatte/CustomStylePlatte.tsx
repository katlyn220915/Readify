"use client";

import React, { useState } from "react";
import styles from "./CustomStylePlatte.module.css";
import { literata, roboto, inter, notoSerif } from "@/fonts/fonts";

import CustomStylePlatteItem from "../CustomStylePlatteItem/CustomStylePlatteItem";

import {
  faFont,
  faTextHeight,
  faArrowsUpDown,
  faArrowsLeftRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { setTypeface } from "@/lib/redux/features/readSlice";
import ActionIcon from "../ActionIcon/ActionIcon";

const options = {
  serif: [
    {
      title: "Literata",
      type: "serif",
      variable: "--font-literata",
      className: literata.className,
    },
    {
      title: "Noto-serif",
      type: "serif",
      variable: "--font-noto-serif",
      className: notoSerif.className,
    },
  ],
  sansSerif: [
    {
      title: "Inter",
      type: "sans-serif",
      variable: "--font-inter",
      className: inter.className,
    },
    {
      title: "Roboto",
      type: "sans-serif",
      variable: "--font-roboto",
      className: roboto.className,
    },
  ],
};

export default function CustomStylePlatte() {
  const { fontSize, lineSpacing, lineWidth, typeface } = useAppSelector(
    (state) => state.read
  );

  const [isTypefaceListOpen, setIsTypefaceListOpen] = useState(false);

  return (
    <div className={styles.custom_styles_field}>
      {isTypefaceListOpen && (
        <div className={styles.typeface_header}>
          <ActionIcon
            iconProp={faChevronLeft}
            promptText="Back to Text styles"
            position="top"
            onAction={() => setIsTypefaceListOpen(false)}
          />
          <span>Typeface</span>
        </div>
      )}
      {!isTypefaceListOpen && <p>Text styles</p>}

      <div className={styles.text_styles_box}>
        {isTypefaceListOpen && (
          <>
            <TypefaceOption type="Serif" option={options.serif} />
            <TypefaceOption type="Sans Serif" option={options.sansSerif} />
          </>
        )}
        {!isTypefaceListOpen && (
          <>
            <CustomStylePlatteItem
              iconProp={faFont}
              customItemName="Typeface"
              value={typeface.title}
              onTypefaceListOpen={setIsTypefaceListOpen}
            />
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
          </>
        )}
      </div>
    </div>
  );
}

const TypefaceOption = ({ type, option }: { type: string; option: any[] }) => {
  const { fontSize, lineSpacing, lineWidth, typeface } = useAppSelector(
    (state) => state.read
  );
  const dispatch = useAppDispatch();
  return (
    <div className={styles.typeface_options}>
      <p className={styles.typeface_title}>{type}</p>
      <ul className={styles.options}>
        {option.map((font) => (
          <li
            key={font.variable}
            className={styles.option}
            onClick={() => {
              dispatch(setTypeface(font));
            }}
          >
            <span className={font.className}>{font.title}</span>
            <span
              className={`${styles.check_box} ${
                typeface.title === font.title ? styles.check_box_active : ""
              }`}
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
};
