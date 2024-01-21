import React, { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./BookMark.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/redux/hooks";
import {
  setIndicatorIntersecting,
  setPosition,
} from "@/lib/redux/features/bookMarkSlice";
import useFirestore from "@/hooks/firebase_db/useFirestore";
import { getElementPositionY, scrollIntoScreen } from "@/utils/helper";

export default function BookMark({ bookMark }: { bookMark: any }) {
  const { height, transform } = useAppSelector((state) => state.bookMark);
  const { currentBook, isLoading } = useAppSelector((state) => state.read);
  const dispatch = useAppDispatch();
  const bookIndicator = useRef(null);
  const currentParagraph = useRef<any>(null);

  // const changeTargetCb = useCallback(
  //   function changeTargetElement(
  //     lastTarget: HTMLElement | null,
  //     newTarget: HTMLElement
  //   ) {
  //     lastTarget = document.querySelector("[data-indicator]");
  //     if (lastTarget) lastTarget.removeAttribute("data-indicator");
  //     newTarget.dataset.indicator = "true";
  //     const { height, positionY } = getElementPositionY("viewer", newTarget);
  //     dispatch(setPosition({ height, transform: positionY }));
  //     return newTarget;
  //   },
  //   [dispatch]
  // );

  // const currentBookMemo = useMemo(() => {
  //   return currentBook;
  // }, [currentBook]);

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
