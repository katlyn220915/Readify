interface BookListProps {
  bookList: Array<BookProps>;
}

type BookProps = {
  author: string;
  bookDownloadURL: string;
  bookId: string;
  coverURL: string | null;
  title: string;
  tags: string[];
};

export type { BookListProps, BookProps };
