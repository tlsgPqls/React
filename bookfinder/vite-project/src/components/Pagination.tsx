import "./Pagination.css";
interface PaginationProps {
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  isEnd: boolean;
}
function Pagination({
  currentPage,
  onPrevPage,
  onNextPage,
  isEnd,
}: PaginationProps) {
  return (
    <div className="pagination-container">
      <button onClick={onPrevPage} disabled={currentPage === 1}>
        이전
      </button>
      <span>현재 페이지 {currentPage} </span>
      <button onClick={onNextPage} disabled={isEnd}>
        이후{" "}
      </button>
    </div>
  );
}
export default Pagination;
