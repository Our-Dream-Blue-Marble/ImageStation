import { Link } from "react-router-dom";

export const showNoticeList = ({ notice, offset, notices }) => {
  notice.slice(offset, offset + notices).map((value) => (
    <div key={value.id}>
      <h1>
        No. {value.num} :
        <Link to={`${process.env.PUBLIC_URL}/notice/${value.num}`}>
          {value.title}
        </Link>
      </h1>
    </div>
  ));
};
