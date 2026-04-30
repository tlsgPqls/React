import "./Bookfinder.css";
import Header from "./Header";
import Footer from "./Footer";
import SearchArea from "./SearchArea";
import BookDetail from "./BookDetail";
import { useState } from "react";
import { type Book } from "../types/Book";
import BookContext from "../contexts/BookContext";

function Bookfinder() {
  const [selected, setSelected] = useState<Book | null>(null);
  const selectBook = (book: Book) => {
    setSelected(book);
  };
  return (
    <BookContext.Provider value={{ selectBook }}>
      <div className="Bookfinder">
        <Header />
        <div className="main-content">
          <SearchArea />
          <BookDetail book={selected} />
        </div>
        <Footer />
      </div>
    </BookContext.Provider>
  );
}
export default Bookfinder;
