import "styles/NoticeAllStyle.scss";
import NoticePagination from "../widgets/NoticePagination";
import React, { useState, useEffect } from "react";
import {
  getNoticeList,
  getNoticeWrittenFullDate,
  getNumOfPinnedNotices,
  onPinnedNoticeDataClick,
} from "functions/NoticeFunction";
import { useLocation, useNavigate } from "react-router-dom";
import { NoticeListRouteName, NoticeWriteRouteName } from "routes/RouteName";
import { ReactComponent as NoticeEmptyPinAsset } from "assets/icons/NoticeEmptyPinIconAsset.svg";
import { ReactComponent as NoticeFilledPinAsset } from "assets/icons/NoticeFilledPinIconAsset.svg";
import { ReactComponent as NoticePinAsset } from "assets/icons/NoticePinCheckIconAsset.svg";
import { ReactComponent as SearchAsset } from "assets/SearchAsset.svg";
import PopUpWithOneButtonsWidgets from "widgets/PopUpWithOneButtonWidgets";
import LoadingWidgets from "widgets/LoadingWidgets";

const NoticeAllPage = ({ isAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const [noticeSearched, setNoticeSearched] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 6;
  const offset = (page - 1) * limit;
  const [isNoticeDeleted, setIsNoticeDeleted] = useState(location.state);
  const [isMaxPinClicked, setIsMaxPinClicked] = useState(false);

  useEffect(() => {
    getNoticeList(setNotice);
    getNoticeList(setNoticeSearched);
  }, []);
  useEffect(() => {
    if (isNoticeDeleted) {
      getNoticeList(setNotice).then((result) => {
        if (result) {
          setIsNoticeDeleted(false);
        }
      });
    }
  }, [isNoticeDeleted]);
  return (
    <>
      {isMaxPinClicked ? (
        <PopUpWithOneButtonsWidgets
          headerText={"죄송합니다!"}
          bodyText={"최대 4개까지\n게시물을 고정할 수 있습니다. "}
          buttonText={"돌아가기"}
          themeColor={"#DD5257"}
          onClickFunction={() => {
            setIsMaxPinClicked(false);
          }}
        />
      ) : (
        <></>
      )}
      {notice === null ? <LoadingWidgets /> : null}
      <div className="NoticeAllLayout">
        <div className="NoticeAllHeadContainer">
          <div className="NoticeAllTitle">
            이미지스테이션의 공지를 확인해보세요
          </div>
          <div>
            {isAdmin ? (
              <button
                className="noticeWriteBtn"
                onClick={() =>
                  navigate(NoticeWriteRouteName, {
                    state: { data: notice[0] },
                  })
                }>
                +
              </button>
            ) : null}
          </div>
        </div>

        <div className="NoticeAllContainer">
          <div className="searchContainer">
            <div className="searchIcon">
              <SearchAsset />
            </div>
            <input
              className="searchInput"
              name="noticeSearch"
              type="text"
              placeholder="검색"
              onChange={(e) => {
                const filteredData = notice.filter(
                  (data) =>
                    data.title.includes(e.target.value) ||
                    data.body.includes(e.target.value)
                );
                setNoticeSearched(filteredData);
              }}
            />
          </div>

          <div className="noticesContainer">
            <hr id="NoticeDevice_line" />
            {noticeSearched.slice(offset, offset + limit).map((value, i) => (
              <>
                <div className="eachNoticeContent" key={value.id}>
                  <div>
                    {isAdmin ? (
                      <>
                        {value.noticePin ? (
                          <div
                            className="noticePinCheckbox"
                            onClick={async () => {
                              await onPinnedNoticeDataClick(
                                value.id,
                                false,
                                notice,
                                setNotice,
                                setNoticeSearched
                              );
                            }}>
                            <NoticeFilledPinAsset width={24} height={24} />
                          </div>
                        ) : (
                          <div
                            className="noticePinCheckbox"
                            onClick={async () => {
                              if (getNumOfPinnedNotices(notice) === 4) {
                                setIsMaxPinClicked(true);
                              } else {
                                await onPinnedNoticeDataClick(
                                  value.id,
                                  true,
                                  notice,
                                  setNotice,
                                  setNoticeSearched
                                );
                              }
                            }}>
                            <NoticeEmptyPinAsset
                              width={24}
                              height={24}
                              color="blue"
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {value.noticePin ? (
                          <div className="noticePinCheckbox">
                            <NoticePinAsset width={12} height={12} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </div>
                  <div
                    onClick={() =>
                      navigate(NoticeListRouteName + "/" + value.id, {
                        state: { data: value },
                      })
                    }>
                    <div className="noticeTitleAndBodyContainer">
                      <div className=" noticeListTitle">{value.title}</div>
                      <pre className="noticeListBody">{value.body}</pre>
                    </div>

                    <div className="noticeDateContainer">
                      <div className="noticeListDate">게시일시:</div>
                      <div className="noticeListDateTime">
                        {getNoticeWrittenFullDate(value)}
                      </div>
                    </div>
                  </div>
                </div>
                <hr id="NoticeDevice_line" />
              </>
            ))}
          </div>
        </div>
        <footer>
          <NoticePagination
            total={notice.length}
            notices={limit}
            page={page}
            setPage={setPage}
          />
        </footer>
      </div>
    </>
  );
};

export default NoticeAllPage;
