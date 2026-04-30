import "./BookList.css";
import type { Book } from "../types/Book";
import BookItem from "./BookItem";
interface BookListProps {
  books: Book[];
}
function BookList({ books }: BookListProps) {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookItem key={book.isbn} book={book} />
      ))}
    </div>
  );
}
export default BookList;
