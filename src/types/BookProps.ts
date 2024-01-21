import TagProps from "./TagProps";

type BookProps = {
  author: string;
  bookDownloadURL: string;
  bookId: string;
  coverURL: string | null;
  title: string;
  tags: TagProps[];
  bookMark?: {
    chapter: string;
    index: string | number;
  };
  category: string;
};

export default BookProps;
