import React, { useEffect, useRef } from "react";
import styles from "./BookMark.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import { setIndicatorIntersecting } from "@/lib/redux/features/bookMarkSlice";

export default function BookMark() {
  const { height, transform } = useAppSelector((state) => state.bookMark);
  const dispatch = useAppDispatch();
  const bookIndicator = useRef(null);

  useEffect(() => {
    if (bookIndicator.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) dispatch(setIndicatorIntersecting(false));
          if (entry.isIntersecting) dispatch(setIndicatorIntersecting(true));
        },
        {
          threshold: 0.5,
        }
      );
      observer.observe(bookIndicator.current);
    }
  });

  return (
    <div
      className={styles.bookMark}
      style={{
        height: `${height}px`,
        transform: `translate(-10px, ${transform}px)`,
      }}
      ref={bookIndicator}
      id="indicator"
    ></div>
  );
}
