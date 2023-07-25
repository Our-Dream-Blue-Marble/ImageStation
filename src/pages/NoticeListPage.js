import React, { useState, useEffect } from "react";
import NoticePagination from "../widgets/NoticePagination";
import { useLocation, useNavigate } from "react-router-dom";
import { NoticeListRouteName, NoticeWriteRouteName } from "routes/RouteName";
import { getNoticeList, getNoticeWrittenDate } from "functions/NoticeFunction";
import "styles/NoticeListStyle.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

const NoticeListPage = ({ isAdmin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 3;
  const offset = (page - 1) * limit;
  const [isNoticeDeleted, setIsNoticeDeleted] = useState(location.state);

  useEffect(() => {
    getNoticeList(setNotice);
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

  SwiperCore.use([Navigation, Pagination]);

  return (
    <div className="noticeListLayout">
      <div className="noticeHead">
        <div className="noticeListHead">이미지스테이션의 소식을 전해드려요</div>
        <div>
          {isAdmin ? (
            <button
              className="noticeWriteBtn"
              onClick={() =>
                navigate(NoticeWriteRouteName, {
                  state: { data: notice[0] },
                })
              }
            >
              +
            </button>
          ) : null}
        </div>
      </div>

      <div className="noticeBoxContainer">
        <Swiper
          spaceBetween={150}
          slidesPerView={3.5}
          slidesPerGroup={3}
          navigation={true}
          loop={true}
          pagination={{
            clickable: true,
            // el: ".snp-pagination",
            // renderBullet: function (index, className) {
            //   return (
            //     '<span class="' + className + '">' + (index + 1) + "</span>"
            //   );
            // },
          }}
          modules={[Navigation, Pagination]}
        >
          {notice.map((value) => (
            <SwiperSlide className="swiper-wrapper ">
              <div
                key={value.id}
                className="cardNotice"
                onClick={() =>
                  navigate(NoticeListRouteName + "/" + value.id, {
                    state: { data: value },
                  })
                }
              >
                <div className="contentCard">
                  <div className=" noticeListTitle">{value.title}</div>
                  <div className=" noticeListDate">
                    {getNoticeWrittenDate(value)}
                  </div>
                  <pre className="noticeListBody">{value.body}</pre>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* <footer>
        <NoticePagination
          total={notice.length}
          notices={limit}
          page={page}
          setPage={setPage}
        />
      </footer> */}
    </div>
  );
};

export default NoticeListPage;
