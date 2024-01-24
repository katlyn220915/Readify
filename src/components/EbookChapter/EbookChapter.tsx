import React from "react";

import { useAppSelector } from "@/hooks/redux/hooks";
const EbookChapter = React.memo(
  ({ divElement }: { divElement: React.JSX.Element }) => {
    const { fontSize, lineSpacing } = useAppSelector((state) => state.read);

    // useEffect(() => {
    //   if (currentChapter !== undefined) {
    //     const chapterElement = document.getElementById(currentChapter);
    //     if (chapterElement) scrollIntoScreen(chapterElement, "start");
    //   }
    // }, []);

    return (
      <div
        className={`epub_document`}
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: lineSpacing,
        }}
      >
        {divElement}
      </div>
    );
  }
);

EbookChapter.displayName = "EbookChapter";

export default EbookChapter;
