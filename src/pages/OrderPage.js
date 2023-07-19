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
    <div className="OrderBody">
      <div className="OrderWholeContainer">
        <div className="OrderContainer-left"></div>
        <div className="OrderContainer-right">
          <h1>일반 주문예약</h1>
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
              <label for="size">
                사이즈
                <select id="size">
                  <option>A2</option>
                  <option>A3</option>
                  <option>A4</option>
                  <option>A5</option>
                </select>
              </label>
            </fieldset>
            <fieldset>
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
            </fieldset>
            <span>
              <label for="request">
                주문사항
                <textarea
                  id="request"
                  placeholder="추가요청 사항을 적어주세요!"
                ></textarea>
              </label>
            </span>
            <span>
            <input
              type={isPossibleSubmit ? "submit" : "button"}
              style={
                isPossibleSubmit
                  ? { background: `rgba(90, 145, 255, 1)` }
                  : { background: `rgba(33, 36, 39, 0.5)` }
              }
              value={"주문하기"}
              onClick={(e) => {
                setIsSubmitButton(true);
              }}
            />
            <button
              name="cancel"
              onClick={(e) => {
                setIsSubmitButton(false);
              }}
            >
              취소하기
            </button>
          </span>
          </form>
         
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
