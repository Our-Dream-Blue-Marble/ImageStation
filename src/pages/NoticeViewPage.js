import { useEffect, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NoticeListRouteName } from "routes/RouteName";
import {
  getNoticeWrittenDate,
  onDeleteNoticeClick,
} from "functions/NoticeFunction";
import { readNoticeDocument } from "repositories/NoticeRepository";
import "styles/NoticeViewStyle.scss";
import deleteAsset from "../assets/icons/NoticeDeleteAsset.svg";

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
                        <a href={noticeViewObj.attachment}>
                          {noticeViewObj.attachmentName}
                        </a>
                      ) : (
                        <>첨부파일 없음</>
                      )}
                    </div>
                  </>
                </div>
              </div>
              <pre className="noticeViewBodyText">{noticeViewObj.body}</pre>
            </div>
          </div>
          <div className="adminNoticeViewButtonsSection">
            {isAdmin ? (
              <>
                <div className="adminNoticeViewButtonsContainer">
                  <button
                    className="noticeViewNavigateList"
                    onClick={() => navigate(NoticeListRouteName)}>
                    홈으로
                  </button>
                  <button
                    className="adminNoticeUpdateButton"
                    onClick={() =>
                      navigate(`${NoticeListRouteName}/update/${id}`, {
                        state: { data: noticeViewObj },
                      })
                    }>
                    수정하기
                  </button>
                </div>
                <div>
                  <button
                    className="adminNoticeDeleteButton"
                    onClick={() => {
                      onDeleteNoticeClick(id);
                      navigate(NoticeListRouteName, { state: true });
                    }}>
                    <img src={deleteAsset} />
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default NoticeViewPage;
