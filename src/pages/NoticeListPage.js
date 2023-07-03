import React, { useState, useEffect } from "react";
import fbase, { dbService } from "fbase";
import NoticePagination from "../widgets/NoticePagination";
import styled from "styled-components";

const NoticeListPage = () => {
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState(1);
  const [notices, setNotices] = useState(5);
  const offset = (page - 1) * notices;

  useEffect(() => {
    dbService
      .collection("notices")
      .orderBy("num", "desc")
      .onSnapshot((snapshot) => {
        const noticeArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotice(noticeArray);
      });
  }, []);

  return (
    <Layout>
      <header>
        <h1>[Notice List]</h1>
      </header>

      <main>
        {notice.slice(offset, offset + notices).map((value) => (
          <div key={value.id}>
            <h1>{value.title}</h1>
          </div>
        ))}
      </main>

      <footer>
        <NoticePagination
          total={notice.length}
          notices={notices}
          page={page}
          setPage={setPage}
        />
      </footer>
    </Layout>
  );
  //   <>
  //     <div>
  //       {notice.map((value) => (
  //         <div key={value.id}>
  //           <h1>{value.title}</h1>
  //         </div>
  //       ))}
  //     </div>
  //     <div>
  //       <button>next Page</button>
  //     </div>
  //   </>
  // );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  max-width: 800px;
  margin: 0 auto;
`;

export default NoticeListPage;
