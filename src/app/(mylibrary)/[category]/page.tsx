import React from "react";

import type { Metadata } from "next";

import Category from "@/components/category/Category/Category";

type Props = {
  params: {
    category: string;
  };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `${params.category
      .split("")[0]
      .toUpperCase()}${params.category.slice(1, params.category.length)}`,
  };
};

export default function Page({ params }: Props) {
  return <Category />;
}
