"use client";

import React from "react";
import styles from "./MarkerColorPlatte.module.css";

import { useAppDispatch } from "@/hooks/redux/hooks";

import { setMarkerColor } from "@/lib/redux/features/readSlice";

export default function MarkerColorPlatte() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.platte}>
      <button
        className={styles.platte_default}
        onClick={() => dispatch(setMarkerColor("marker-default"))}
      ></button>
      <button
        className={styles.platte_celadon}
        onClick={() => dispatch(setMarkerColor("marker-celadon"))}
      ></button>
      <button
        className={styles.platte_argentinian}
        onClick={() => dispatch(setMarkerColor("marker-argentinian"))}
      ></button>
      <button
        className={styles.platte_mauve}
        onClick={() => dispatch(setMarkerColor("marker-mauve"))}
      ></button>
    </div>
  );
}
