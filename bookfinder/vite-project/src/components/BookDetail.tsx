import "./BookDetail.css";
import type { Book } from "../types/Book";
interface BookDetailProps {
  book: Book | null;
}
function BookDetail({ book }: BookDetailProps) {
  if (!book) {
    return <div className="book-detail">책을 선택하세요</div>;
  }
  return (
    <div className="book-detail">
      <h2>{book.title}</h2>
      <p>
        <strong>저자:</strong>
        {book.authors.join(", ")}
      </p>
      <p>
        <strong>출판사:</strong>
        {book.publisher}
      </p>
      <p>
        <strong>출판일:</strong>
        {book.datetime.split(`T`)[0]}
      </p>
      <p>
        <strong>isbn:</strong>
        {book.isbn}
      </p>
      <p>
        <strong>책내용:</strong>
        {book.contents}
      </p>
      <p>
        <strong>상세참조:</strong>
        <a href={book.url} target="_blank">
          {book.title}
        </a>
      </p>
      <img src={book.thumbnail} alt={`${book.title}의 표지`} />
    </div>
  );
}
export default BookDetail;
