import Epub from "epubjs";
import ePub, { Book } from "epubjs";
import Section from "epubjs/types/section";
import React from "react";
import { decode } from "@/utils/helper";

const parseEpub = () => {
  const getBookInfos = () => {};

  const getContents = async (url: string) => {
    const book = ePub(url);
    const toc = book.ready.then(async () => {
      const navigationToc = book.navigation.toc;
      const cleanToc = navigationToc.map(({ id, label, href }) => ({
        id,
        label,
        href,
      }));
      return cleanToc;
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

  // const handleDocuments = (
  //   epubDocuments: {
  //     path: string;
  //     doc: any;
  //   }[],
  //   images: any
  // ) => {
  //   const cleanChapterDivs = epubDocuments.map(({ path, doc }, id) => {
  //     const bodyContent = doc.body.innerHTML;
  //     const chapterDiv = document.createElement("div");
  //     chapterDiv.innerHTML = bodyContent;
  //     chapterDiv.id = decodeURIComponent(path)
  //       .replaceAll(" ", "")
  //       .replace(/\.(xhtml|html).*/, "");
  //     chapterDiv.classList.add("epub_document");
  //     const imgEls = chapterDiv.querySelectorAll("img");
  //     const invalidImageTags = chapterDiv.querySelectorAll("image");
  //     if (invalidImageTags.length > 0) {
  //       invalidImageTags.forEach((invalidImgTag) => {
  //         const parent = invalidImgTag.parentNode;
  //         parent?.removeChild(invalidImgTag);
  //         console.log(parent);
  //       });
  //     }
  //     imgEls.forEach((el) => {
  //       el.parentElement?.classList.add("image_wrapper");
  //       const originSrc = el.getAttribute("src");
  //       const fileName = originSrc?.split("/").pop();
  //       const obj = images;
  //       if (fileName) {
  //         el.src = obj[fileName];
  //       }
  //     });
  //     return chapterDiv;
  //   });
  //   return cleanChapterDivs;
  // };

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
        <div key={path} id={decode(path)} className="epub_document_content">
          <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
        </div>
      );
      return chapterDiv;
    });
    return cleanChapterDivs;
  };

  return { getImages, getAllDocuments, getContents, handleDocuments };
};

export default parseEpub;
