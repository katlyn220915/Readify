import React, { useEffect } from "react";
import styles from "./BookMark.module.css";
import { useAppSelector } from "@/hooks/redux/hooks";

export default function BookMark({}: {}) {
  const { height, transform } = useAppSelector((state) => state.bookMark);
  // useEffect(() => {
  //   // const window = document
  //   // var elem = document.elementFromPoint(window.width/2, window.height/2);
  //   // 獲取視窗的寬度和高度
  //   var windowWidth =
  //     window.innerWidth ||
  //     document.documentElement.clientWidth ||
  //     document.body.clientWidth;
  //   var windowHeight =
  //     window.innerHeight ||
  //     document.documentElement.clientHeight ||
  //     document.body.clientHeight;

  //   // 計算中心點的坐標
  //   var centerX = windowWidth / 2;
  //   var centerY = windowHeight / 2;

  //   // 使用 document.elementFromPoint 獲取位於中心的元素
  //   var elem = document.elementFromPoint(centerX, centerY);
  //   console.log(elem);
  // });

  return (
    <div
      className={styles.bookMark}
      style={{
        height: `${height}px`,
        transform: `translate(-10px, ${transform}px)`,
      }}
    ></div>
  );
}
