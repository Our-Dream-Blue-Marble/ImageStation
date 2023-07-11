import { useEffect, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NoticeListRouteName } from "routes/RouteName";
import {
  getNoticeWrittenDate,
  onDeleteNoticeClick,
} from "functions/NoticeFunction";
import { readNoticeDocument } from "repositories/NoticeRepository";
import "styles/NoticeViewStyle.scss";

const NoticeViewPage = ({ isAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [noticeViewObj, setNoticeViewObj] = useState(null);
  const { id } = useParams();
  const noticeData = location.state;
  useEffect(() => {
    if (noticeData === null) {
      if (noticeViewObj === null && id !== null) {
        readNoticeDocument(id).then((result) => {
          setNoticeViewObj(result);
        });
      }
    } else {
      if (noticeViewObj === null && id !== null) {
        setNoticeViewObj(noticeData);
      }
    }
  }, []);

  return (
    <div className="noticeViewLayout">
      {noticeViewObj === null ? (
        <>Loading...</>
      ) : (
        <>
          <div className="noticeViewBoxContainer">
            <div className="noticeViewContent">
              <div className="noticeViewTopSection">
                <div className="noticeViewTitle">{noticeViewObj.title}</div>
                <div className="noticeViewRightSection">
                  <div className="noticeViewRightText">
                    {getNoticeWrittenDate(noticeViewObj)}{" "}
                  </div>
                  <div className="noticeViewRightText">
                    no. {noticeViewObj.id}{" "}
                  </div>
                  <div className="noticeViewRightText">
                    조회수 {noticeViewObj.view}
                  </div>
                  <>
                    <div className="noticeViewAttachmentText">
                      {noticeViewObj.attachment ? (
                        <a href={noticeViewObj.attachment}> 첨부 파일 </a>
                      ) : (
                        <>첨부파일 없음</>
                      )}
                    </div>
                  </>
                </div>
              </div>
              <div className="noticeViewBodyText">{noticeViewObj.body}</div>
              <div>
                <button onClick={() => navigate(NoticeListRouteName)}>
                  리스트로 돌아가기
                </button>
                {isAdmin ? (
                  <>
                    <button
                      onClick={() =>
                        navigate(`${NoticeListRouteName}/update/${id}`, {
                          state: { data: noticeViewObj },
                        })
                      }
                    >
                      수정하기
                    </button>
                    <button
                      onClick={() => {
                        onDeleteNoticeClick(id);
                        navigate(NoticeListRouteName);
                      }}
                    >
                      삭제하기
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NoticeViewPage;
