import React from "react";

import type { Metadata } from "next";

import Read from "@/components/readingPage/Read/Read";

type Props = {
  params: {
    category: string;
    bookId: string;
  };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Book-${params.bookId}`,
    description: "Read and take notes simultaneously",
  };
};

export default function Page({ params }: Props) {
  return (
    <>
      <Read />
    </>
  );
}
