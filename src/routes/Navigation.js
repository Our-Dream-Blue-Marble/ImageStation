import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
        </li>
        <li>
          <Link to={`${process.env.PUBLIC_URL}/notice`}>NoticeList</Link>
        </li>
        <li>
          <Link to={`${process.env.PUBLIC_URL}/signin`}>SignIn</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
