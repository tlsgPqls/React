import "./BookItem.css";
import type { Book } from "../types/Book";
import { useContext } from "react";
import BookContext from "../contexts/BookContext";
interface BookItemProps {
  book: Book;
}
function BookItem({ book }: BookItemProps) {
  const context = useContext(BookContext);
  if (!context) throw new Error(`Context 가 없습니다.`);
  const { selectBook } = context;
  return (
    <div className="book-item" onClick={() => selectBook(book)}>
      <img src={book.thumbnail} alt={`$book.title}의표지`} />
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.authors.join(", ")}</p>
      </div>
    </div>
  );
}
export default BookItem;
