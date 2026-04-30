import { useState } from "react";
import Bookfinder from "./components/Bookfinder";

import "./App.css";
import Pagination from "./components/Pagination";

function App() {
  const [page, setPage] = useState(1);
  return (
    <>
      <Bookfinder />
      {/* <Pagination
        currentPage={page}
        onPageChange={(newPage) => setPage(newPage)}
      /> */}
    </>
  );
}

export default App;
