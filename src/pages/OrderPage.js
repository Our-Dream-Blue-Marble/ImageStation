import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  OrderCategoryPageRouteName,
  OrderConfirmListRouteName,
} from "routes/RouteName";
import { onOrderSubmit, onOrderTitleChange } from "functions/OrderFunction";
import "styles/OrderStyle.scss";

const OrderPage = () => {
  const navigate = useNavigate();
  const [orderTitle, setOrderTitle] = useState("");
  const [orderPage, setOrderPage] = useState("");
  const [orderLayout, setOrderLayout] = useState("");
  const [orderSize, setOrderSize] = useState("");
  const [orderPaper, setOrderPaper] = useState("");
  const [orderColor, setOrderColor] = useState("");
  const [orderMoreInfo, setOrderMoreInfo] = useState("");
  const [isSubmitButton, setIsSubmitButton] = useState(false);
  const [isPossibleSubmit, setIsPossibleSubmit] = useState(false);
  const location = useLocation();
  const category = location.state.data;

  useEffect(() => {
    if (orderTitle !== "") {
      setIsPossibleSubmit(true);
    } else {
      setIsPossibleSubmit(false);
    }
  }, [orderTitle]);

  return (
    <div className="OrderLayout">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (isSubmitButton === true) {
            onOrderSubmit(
              e,
              category,
              orderTitle,
              orderPage,
              orderLayout,
              orderSize,
              orderPaper,
              orderColor,
              orderMoreInfo
            ).then((result) => {
              if (result) {
                navigate(OrderConfirmListRouteName);
              }
            });
          } else {
            navigate(OrderCategoryPageRouteName);
          }
        }}
      >
        <div className="OrderWholeContainer">
          <div className="OrderContainer-left"></div>
          <div className="OrderContainer-right">
            {category === "normal" && <h1>일반 주문예약</h1>}
            {category === "binding" && <h1>제본 주문예약</h1>}
            {category === "labeling" && <h1>라벨지 주문예약</h1>}
            {category === "actual" && <h1>실사대형출력 주문예약</h1>}
            {category === "photo" && <h1>사진인화 주문예약</h1>}
            {category === "etc" && <h1>기타 주문예약</h1>}
            <fieldset>
              <label for="title">
                제목
                <input
                  id="title"
                  title={orderTitle}
                  onChange={async (e) => {
                    onOrderTitleChange(e, setOrderTitle);
                  }}
                  type="text"
                  placeholder="제목을 입력하세요"
                  maxLength={100}
                />
              </label>
              <label for="page">
                페이지
                <select id="page">
                  <option value={0}>전체</option>
                  <option value={1}>짝수</option>
                  <option value={2}>홀수</option>
                </select>
              </label>
              <label for="layout">
                레이아웃
                <select id="layout">
                  <option>가로 방향</option>
                  <option>세로 방향</option>
                </select>
              </label>
              {category !== "labeling" && (
                <label for="size">
                  사이즈
                  <select id="size">
                    <option>A2</option>
                    <option>A3</option>
                    <option>A4</option>
                    <option>A5</option>
                  </select>
                </label>
              )}
              {category === "binding" && (
                <span>
                  <label for="layout">
                    제본방식
                    <select id="layout">
                      <option>B4</option>
                      <option>B2</option>
                    </select>
                  </label>
                  <label for="layout">
                    코팅
                    <select id="layout">
                      <option>코팅 있음</option>
                      <option>코팅 없음</option>
                    </select>
                  </label>
                </span>
              )}
            </fieldset>
            <fieldset>
              {category === "normal" && (
                <details>
                  <summary>설정 더보기</summary>
                  <label for="paper">
                    종이
                    <select id="paper">
                      <option>스노우지</option>
                      <option>마시멜로우지</option>
                    </select>
                  </label>
                  <label for="color">
                    컬러
                    <select id="color">
                      <option>빨간색</option>
                      <option>파란색</option>
                      <option>아이보리색</option>
                      <option>검은색</option>
                    </select>
                  </label>
                </details>
              )}
              {category === "binding" && (
                <details>
                  <summary>설정 더보기</summary>
                  <label for="paper">
                    종이
                    <select id="paper">
                      <option>스노우지</option>
                      <option>마시멜로우지</option>
                    </select>
                  </label>
                  <label for="color">
                    컬러
                    <select id="color">
                      <option>빨간색</option>
                      <option>파란색</option>
                      <option>아이보리색</option>
                      <option>검은색</option>
                    </select>
                  </label>
                </details>
              )}
              {category === "actual" && (
                <details>
                  <summary>설정 더보기</summary>
                  <label for="paper">
                    종이
                    <select id="paper">
                      <option>스노우지</option>
                      <option>마시멜로우지</option>
                    </select>
                  </label>
                  <label for="color">
                    컬러
                    <select id="color">
                      <option>빨간색</option>
                      <option>파란색</option>
                      <option>아이보리색</option>
                      <option>검은색</option>
                    </select>
                  </label>
                </details>
              )}
              {category === "labeling" && (
                <label>
                  컬러
                  <select id="color">
                    <option>빨간색</option>
                    <option>파란색</option>
                    <option>아이보리색</option>
                    <option>검은색</option>
                  </select>
                </label>
              )}
              {category === "photo" && (
                <label>
                  컬러
                  <select id="color">
                    <option>흑백</option>
                    <option>컬러</option>
                  </select>
                </label>
              )}

              <span>
                <label for="request">
                  주문사항
                  <textarea
                    id="request"
                    placeholder="추가요청 사항을 적어주세요!"
                  ></textarea>
                </label>
              </span>
            </fieldset>
          </div>

          <div id="buttons">
            <button
              className="OrderCancelBtn"
              name="cancel"
              onClick={(e) => {
                setIsSubmitButton(false);
              }}
            >
              취소
            </button>
            <input
              className="OrderSaveBtn"
              type={isPossibleSubmit ? "submit" : "button"}
              style={
                isPossibleSubmit
                  ? { background: `rgba(90, 145, 255, 1)` }
                  : { background: `rgba(33, 36, 39, 0.5)` }
              }
              value={"주문"}
              onClick={(e) => {
                setIsSubmitButton(true);
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderPage;
