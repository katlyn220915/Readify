import { Dispatch, SetStateAction } from "react";
import TagProps from "./TagProps";

interface BookListProps {
  bookList: Array<BookProps>;
}

type BookProps = {
  author: string;
  bookDownloadURL: string;
  bookId: string;
  coverURL: string | null;
  title: string;
  tags: TagProps[];
};

export type { BookListProps, BookProps };
