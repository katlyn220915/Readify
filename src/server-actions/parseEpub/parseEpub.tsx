import React from "react";

import Epub, { NavItem } from "epubjs";
import ePub, { Book } from "epubjs";
import Section from "epubjs/types/section";

import { decode } from "@/utils/helper";

const parseEpub = () => {
  const getBookInfos = () => {};

  const getContents = async (url: string) => {
    const book = ePub(url);
    const toc = book.ready.then(async () => {
      const navigationToc = book.navigation.toc;

      const allToc = navigationToc.map(({ id, label, href, subitems }) => {
        if (subitems && subitems.length > 0) {
          return {
            id,
            label,
            href,
            subitems,
          };
        } else {
          return {
            id,
            label,
            href,
            subitems,
          };
        }
      });
      return allToc;
    });
    return toc;
  };

  const getAllDocuments = async (url: string) => {
    const book = ePub(url);
    const allDocumentPath: string[] = [];
    const documentsObjectArr = await book.ready
      .then(() => {
        const spine = book.spine;
        spine.each((section: Section) => {
          allDocumentPath.push(section.href);
        });
        return allDocumentPath;
      })
      .then(async (allDocumentPath) => {
        const tocList = book.navigation.toc;
        const documentsObjectArr = await Promise.all(
          allDocumentPath.map(async (path) => {
            const doc: any = await book.load(path);
            return { path, doc };
          })
        );
        return documentsObjectArr;
      });
    return documentsObjectArr;
  };

  const getImages = async (url: string) => {
    const book = ePub(url);
    const images = await book.ready
      .then(async () => {
        const imgBlobPathSet: Set<string> = new Set();
        const docsArr = await getAllDocuments(url);

        docsArr.map(({ path, doc }) => {
          const imgElements = doc.querySelectorAll("img");
          if (imgElements.length > 0) {
            imgElements.forEach((imgEl: any) => {
              imgBlobPathSet.add(imgEl.getAttribute("src").replace("../", ""));
            });
          }
        });
        return imgBlobPathSet;
      })
      .then(async (imgBlobPathSet) => {
        const path = book.path;
        const archive = book.archive;
        const arrImgBlobPathSet = Array.from(imgBlobPathSet);
        const array = await Promise.all(
          arrImgBlobPathSet.map(async (url) => {
            const fileName = url.split("/").pop();
            const blob = await archive.getBlob(path.resolve(url));
            if (fileName !== undefined) {
              return await { fileName, blob };
            }
          })
        );
        return array;
      });
    return images;
  };

  //Using Virtual DOM to create React Element, speed up the loading state

  const handleDocuments = (
    epubDocuments: {
      path: string;
      doc: any;
    }[],
    images: any
  ) => {
    const cleanChapterDivs = epubDocuments.map(({ path, doc }, id) => {
      const imgEls = doc.querySelectorAll("img");
      const invalidImgTags = doc.querySelectorAll("image");
      const aTags = doc.querySelectorAll("a");
      handleAnchorTags(aTags);
      //Clean up invalid image elements
      if (invalidImgTags.length > 0)
        invalidImgTags.forEach((el: any) => {
          const parent = el.parentNode;
          parent?.removeChild(el);
        });

      imgEls.forEach((el: any) => {
        el.parentElement?.classList.add("image_wrapper");
        const originSrc = el.getAttribute("src");
        const fileName = originSrc?.split("/").pop();
        const obj = images;

        if (fileName) {
          el.src = obj[fileName];
        }
      });

      const bodyContent = doc.body.innerHTML;

      const chapterDiv = (
        <div
          dangerouslySetInnerHTML={{ __html: bodyContent }}
          key={path}
          id={decode(path)}
          className="epub_document_content"
        />
      );
      return chapterDiv;
    });
    return cleanChapterDivs;
  };

  const handleAnchorTags = (anchors: any) => {
    anchors.forEach((el: any) => {
      const href = el.getAttribute("href");
      if (href) {
        const value = href.split("#")[1];
        el.setAttribute("href", `#${value}`);
      }
    });
  };

  return { getImages, getAllDocuments, getContents, handleDocuments };
};

export default parseEpub;
