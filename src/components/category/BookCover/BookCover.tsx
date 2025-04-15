import React from "react";

import Image from "next/image";

import styles from "./BookCover.module.css";

export const BookCover = ({
  coverUrl,
  title,
}: {
  coverUrl: string | null;
  title: string;
}) => {
  return (
    <div className={styles.img_container}>
      {coverUrl && (
        <Image src={coverUrl} alt={`Book-${title}`} width={80} height={80} />
      )}
      {coverUrl === null && (
        <Image
          src="/image/image-not-found.png"
          alt={`Image not found`}
          width={80}
          height={80}
        />
      )}
    </div>
  );
};
