import storeFiles from "@/server-actions/store/storeFiles";
import { Book } from "epubjs";
import Section from "epubjs/types/section";

const useEpubParser = () => {
  const store = storeFiles();
  const getAllImagesFromEpub = async (book: Book) => {
    const images = await book.ready
      .then(async () => {
        const allDocumentPath: string[] = [];
        const spine = book.spine;
        const imgBlobPathSet: Set<string> = new Set();
        spine.each((section: Section) => {
          allDocumentPath.push(section.href);
        });

        const docArr = await Promise.all(
          allDocumentPath.map(async (path) => {
            const doc: any = await book.load(path);
            return doc;
          })
        );

        docArr.map((doc) => {
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

  return { getAllImagesFromEpub };
};

export default useEpubParser;
