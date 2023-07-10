import styled from "styled-components";
import "styles/NoticeListStyle.scss";
import ArrowImage from "../assets/ArrowAsset.svg";

function Pagination({ total, notices, page, setPage }) {
  const numPages = Math.ceil(total / notices);

  return (
    <div className="paginationBar">
      <button
        className="paginationLtBtn"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        <img src={ArrowImage} />
      </button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button
            className="paginationBtn"
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </button>
        ))}
      <button
        className="paginationRtBtn"
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
      >
        <img src={ArrowImage} />
      </button>
    </div>
  );
}

export default Pagination;
