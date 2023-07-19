import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  OrderCategoryPageRouteName,
  OrderConfirmListRouteName,
} from "routes/RouteName";
import { onOrderSubmit, onOrderTitleChange } from "functions/OrderFunction";

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

  useEffect(() => {
    if (orderTitle !== "") {
      setIsPossibleSubmit(true);
    } else {
      setIsPossibleSubmit(false);
    }
  }, [orderTitle]);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (isSubmitButton === true) {
            onOrderSubmit(
              e,
              "normal",
              orderTitle,
              orderPage,
              orderLayout,
              orderSize,
              "",
              "",
              orderPaper,
              orderColor,
              orderMoreInfo,
              "",
              ""
            ).then((result) => {
              if (result) {
                navigate(OrderCategoryPageRouteName);
              }
            });
          } else {
            navigate(OrderCategoryPageRouteName);
          }
        }}
      >
        <ul>
          <li>
            <label for="title">제목</label>
            <input
              title={orderTitle}
              onChange={async (e) => {
                onOrderTitleChange(e, setOrderTitle);
              }}
              type="text"
              placeholder="제목을 입력하세요"
              maxLength={100}
            />
          </li>
          <li>
            <label for="page">페이지</label>
            <select id="page">
              <option>전체</option>
              <option>짝수</option>
              <option>홀수</option>
            </select>
          </li>
          <li>
            <label for="layout">레이아웃</label>
            <select id="layout">
              <option>가로 방향</option>
              <option>세로 방향</option>
            </select>
          </li>
          <li>
            <label for="size">사이즈</label>
            <select id="size">
              <option>A2</option>
              <option>A3</option>
              <option>A4</option>
              <option>A5</option>
            </select>
          </li>
        </ul>
        <ul>
          <details>
            <summary>설정 더보기</summary>
            <li>
              <label for="paper">종이</label>
              <select id="paper">
                <option>스노우지</option>
                <option>마시멜로우지</option>
              </select>
            </li>
            <li>
              <label for="color">컬러</label>
              <select id="color">
                <option>빨간색</option>
                <option>파란색</option>
                <option>아이보리색</option>
                <option>검은색</option>
              </select>
            </li>
          </details>
        </ul>
        <label for="request">주문사항</label>
        <textarea
          id="request"
          placeholder="추가요청 사항을 적어주세요!"
        ></textarea>
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
      </form>
    </div>
  );
};

export default OrderPage;
