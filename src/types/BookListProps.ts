interface BookListProps {
  bookList: Array<{
    id: string;
    title: string;
    author: string;
    tags: string[];
    img: string;
  }>;
}

export default BookListProps;
