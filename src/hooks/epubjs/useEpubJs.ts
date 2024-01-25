import ePub, { Book } from "epubjs";

const useEpubJs = () => {
  const getBookInfos = async (path: string) => {
    try {
      const newBook = await ePub(path);
      const bookInfos = await newBook.ready.then(async function () {
        const title: string = (newBook as any).package.metadata.title;
        const author: string = (newBook as any).package.metadata.creator;
        const coverURL: string | null = await newBook.coverUrl();
        return {
          title,
          author,
          coverURL,
        };
      });

      return bookInfos;
    } catch (e) {
      console.error(e);
    }
  };

  const renderBook = async (path: string) => {
    try {
      const newBook = ePub(path);
      return newBook;
    } catch (e) {
      console.error(e);
    }
  };

  return { getBookInfos, renderBook };
};

export default useEpubJs;
