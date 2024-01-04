import React from "react";

import { useAppSelector } from "@/hooks/redux/hooks";
const EbookChapter = ({ divElement }: { divElement: React.JSX.Element }) => {
  const { fontSize, lineSpacing } = useAppSelector((state) => state.read);

  return (
    <div
      className="epub_document"
      style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
    >
      {divElement}
    </div>
  );
};
export default EbookChapter;
