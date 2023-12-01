import ePub from "epubjs";

const useEpubJs = () => {
  const getBookInfos = async (path: string) => {
    try {
      const newBook = await ePub(path);
      const bookInfos = await newBook.ready.then(async function () {
        const title = (newBook as any).package.metadata.title;
        const author = (newBook as any).package.metadata.creator;
        const coverURL = await newBook.coverUrl();
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

  return { getBookInfos };
};

export default useEpubJs;
