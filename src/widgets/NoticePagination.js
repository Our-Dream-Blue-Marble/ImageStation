import styled from "styled-components";
import "styles/NoticeListStyle.scss";

function Pagination({ total, notices, page, setPage }) {
  const numPages = Math.ceil(total / notices);

  return (
    <div className="paginationBar">
      <nav className="paginationBtn">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </button>
          ))}
        <button
          className="paginationBtn"
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
        >
          &gt;
        </button>
      </nav>
    </div>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: left;
  align-items: left;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 7px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: blue;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: skyblue;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

export default Pagination;
