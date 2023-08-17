import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NoticeAllRouteName, NoticeListRouteName } from "routes/RouteName";
import {
  getNoticeWrittenDate,
  onDeleteNoticeClick,
} from "functions/NoticeFunction";
import { readNoticeDocument } from "repositories/NoticeRepository";
import { ReactComponent as DeleteAsset } from "assets/icons/NoticeDeleteIconAsset.svg";
import "styles/NoticeViewStyle.scss";
import { onAttachmentDownloadClick } from "functions/CommonFunction";
import Loading from "assets/Loading.gif";

const NoticeViewPage = ({ isAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [noticeViewObj, setNoticeViewObj] = useState(null);
  const { id } = useParams();
  const [clickedDelete, setClickedDelete] = useState(false);
  useEffect(() => {
    if (location.state === null) {
      if (noticeViewObj === null && id !== null) {
        readNoticeDocument(id).then((result) => {
          setNoticeViewObj(result);
        });
      }
    } else {
      if (noticeViewObj === null && id !== null) {
        setNoticeViewObj(location.state.data);
      }
    }
  }, [noticeViewObj, id, location.state]);

  return (
    <>
      {clickedDelete ? (
        <div className="popUp">
          <div className="popUpContainer">
            <div className="popUpRedText">공지를 삭제할까요?</div>
            <div className="popUpBlackText">
              삭제를 하면 복구가
              <br />
              불가능합니다!
            </div>
            <div className="popUpButton">
              <button
                className="popUpCancel"
                onClick={() => setClickedDelete(false)}
              >
                취소
              </button>
              <button
                className="popUpDelete"
                onClick={() => {
                  onDeleteNoticeClick(id);
                  navigate(NoticeAllRouteName, {
                    state: true,
                    replace: true,
                  });
                }}
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <div className="noticeViewLayout">
        {noticeViewObj === null ? (
          <div className="LoadingBackGround">
            <video src={Loading} className="LoadingGif" />
          </div>
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
                      <div>
                        {noticeViewObj.attachment ? (
                          <div
                            className="noticeViewAttachmentText"
                            onClick={() =>
                              onAttachmentDownloadClick(noticeViewObj)
                            }
                          >
                            {noticeViewObj.attachmentName}
                          </div>
                        ) : null}
                      </div>
                    </>
                  </div>
                </div>
                <pre className="noticeViewBodyText">
                  {noticeViewObj.body}
                  {noticeViewObj.attachmentName.match(
                    /(.*?)\.(jpg|jpeg|png|gif|bmp)$/
                  ) && <img src={noticeViewObj.attachment} />}
                </pre>
              </div>
            </div>
            <div className="adminNoticeViewButtonsSection">
              {isAdmin ? (
                <>
                  <div className="adminNoticeViewButtonsContainer">
                    <button
                      className="noticeViewNavigateList"
                      onClick={() => navigate(-1)}
                    >
                      목록으로
                    </button>
                    <button
                      className="adminNoticeUpdateButton"
                      onClick={() =>
                        navigate(`${NoticeListRouteName}/update/${id}`, {
                          state: { data: noticeViewObj },
                          replace: true,
                        })
                      }
                    >
                      수정하기
                    </button>
                  </div>
                  <div>
                    <button
                      className="adminNoticeDeleteButton"
                      onClick={() => {
                        setClickedDelete(true);
                      }}
                    >
                      <DeleteAsset />
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NoticeViewPage;
