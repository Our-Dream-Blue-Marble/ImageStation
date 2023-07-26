import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  OrderCategoryPageRouteName,
  OrderConfirmListRouteName,
} from "routes/RouteName";
import {
  onOrderFieldChange,
  onOrderAttachmentChage,
  onOrderSubmit,
} from "functions/OrderFunction";
import "styles/OrderStyle.scss";
import { Viewer, Worker } from "@react-pdf-viewer/core";

const OrderPage = () => {
  const navigate = useNavigate();
  const [orderTitle, setOrderTitle] = useState("");
  const [orderPage, setOrderPage] = useState("");
  const [orderLayout, setOrderLayout] = useState(false);
  const [orderSize, setOrderSize] = useState("");
  const [orderBinding, setOrderBinding] = useState("");
  const [orderCoating, setOrderCoating] = useState(false);
  const [orderPaper, setOrderPaper] = useState("");
  const [orderColor, setOrderColor] = useState("");
  const [orderMoreInfo, setOrderMoreInfo] = useState("");
  const [orderAttachment, setOrderAttachment] = useState("");
  const [orderAttachmentName, setOrderAttachmentName] = useState("");
  const [isSubmitButton, setIsSubmitButton] = useState(false);
  const [isPossibleSubmit, setIsPossibleSubmit] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isFileUploadButton, setIsFileUploadButton] = useState(true);
  const [isPdf, setIsPdf] = useState(false);
  const location = useLocation();
  const category = location.state.data;

  useEffect(() => {
    if (orderTitle !== "" && imageUrl !== "") {
      setIsPossibleSubmit(true);
    } else {
      setIsPossibleSubmit(false);
    }
  }, [orderTitle, imageUrl]);

  return (
    <div className="OrderLayout">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (isSubmitButton === true) {
            if (category)
              onOrderSubmit(
                e,
                category,
                orderTitle,
                orderPage,
                orderLayout,
                orderSize,
                orderBinding,
                orderCoating,
                orderPaper,
                orderColor,
                orderMoreInfo,
                orderAttachment,
                orderAttachmentName
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
          <div className="OrderContainer-left">
            {isFileUploadButton ? (
              <>
                <label for="fileuploadbutton" className="FileUploadButton">
                  파일 업로드
                </label>
                <input
                  type="file"
                  id="fileuploadbutton"
                  onChange={(e) => {
                    onOrderAttachmentChage(
                      e,
                      setOrderAttachment,
                      setOrderAttachmentName,
                      setImageUrl,
                      setIsFileUploadButton,
                      setIsPdf
                    );
                  }}
                />
                <label className="drag">
                  드래그를 통해서도
                  <br />
                  파일 업로드 가능해요
                </label>
              </>
            ) : (
              <button
                className="FileCancleButton"
                onClick={(e) => {
                  setIsFileUploadButton(true);
                  setImageUrl("");
                }}
              >
                취소
              </button>
            )}
            <div style={{ height: "470px", width: "300px" }}>
              {isPdf
                ? imageUrl !== "" &&
                  isFileUploadButton === false && (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                      <div
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.3)",
                          height: "100%",
                        }}
                      >
                        <Viewer fileUrl={imageUrl} />
                      </div>
                    </Worker>
                  )
                : imageUrl !== "" &&
                  isFileUploadButton === false && <img src={imageUrl} />}
            </div>
          </div>
          <div className="OrderContainer-right">
            {category === "etc" ? (
              <>
                <h1>기타주문 사항 입니다.</h1>
                <div>Hello</div>
              </>
            ) : (
              <>
                {category === "normal" && <h1>일반 주문예약</h1>}
                {category === "binding" && <h1>제본 주문예약</h1>}
                {category === "labeling" && <h1>라벨지 주문예약</h1>}
                {category === "actual" && <h1>실사대형출력 주문예약</h1>}
                {category === "photo" && <h1>사진인화 주문예약</h1>}
                <fieldset>
                  <span>
                    <label for="title">제목</label>
                    <input
                      id="title"
                      name="page"
                      title={orderTitle}
                      onChange={async (e) => {
                        onOrderFieldChange(e, setOrderTitle);
                      }}
                      type="text"
                      placeholder="제목을 입력하세요."
                      maxLength={100}
                    />
                  </span>
                  <span>
                    <label for="page">페이지</label>
                    <select
                      id="page"
                      name="page"
                      onChange={async (e) => {
                        onOrderFieldChange(e, setOrderPage);
                      }}
                    >
                      {" "}
                      <option></option>
                      <option value={0}>전체</option>
                      <option value={1}>짝수</option>
                      <option value={2}>홀수</option>
                    </select>
                  </span>
                  <span>
                    <label for="layout">레이아웃</label>
                    <select
                      id="layout"
                      name="layout"
                      onChange={async (e) => {
                        onOrderFieldChange(e, setOrderLayout);
                      }}
                    >
                      <option></option>
                      <option>가로 방향</option>
                      <option>세로 방향</option>
                    </select>
                  </span>
                  {category !== "labeling" && (
                    <span>
                      <label for="size">사이즈</label>
                      <select
                        id="size"
                        name="size"
                        onChange={async (e) => {
                          onOrderFieldChange(e, setOrderSize);
                        }}
                      >
                        <option></option>
                        <option>A2</option>
                        <option>A3</option>
                        <option>A4</option>
                        <option>A5</option>
                      </select>
                    </span>
                  )}
                  {category === "binding" && (
                    <span>
                      <label for="binding">
                        제본방식
                        <select
                          id="binding"
                          name="binding"
                          onChange={async (e) => {
                            onOrderFieldChange(e, setOrderBinding);
                          }}
                        >
                          <option></option>
                          <option>B4</option>
                          <option>B2</option>
                        </select>
                      </label>
                      <label for="coating">코팅</label>
                      <select
                        id="coating"
                        name="coating"
                        onChange={async (e) => {
                          onOrderFieldChange(e, setOrderCoating);
                        }}
                      >
                        <option></option>
                        <option>코팅 있음</option>
                        <option>코팅 없음</option>
                      </select>
                    </span>
                  )}
                </fieldset>
                <fieldset>
                  {(category === "normal" ||
                    category === "binding" ||
                    category === "actual") && (
                    <details>
                      <summary>설정 더보기</summary>
                      <span>
                        <label for="paper">
                          종이
                          <select
                            id="paper"
                            name="paper"
                            onChange={async (e) => {
                              onOrderFieldChange(e, setOrderPaper);
                            }}
                          >
                            <option></option>
                            <option>스노우지</option>
                            <option>마시멜로우지</option>
                          </select>
                        </label>
                      </span>
                      <span>
                        <label for="color">컬러</label>
                        <select
                          id="color"
                          name="color"
                          onChange={async (e) => {
                            onOrderFieldChange(e, setOrderColor);
                          }}
                        >
                          <option></option>
                          <option>흑백</option>
                          <option>컬러</option>
                        </select>
                      </span>
                    </details>
                  )}
                  {(category === "labeling" || category === "photo") && (
                    <label for="color">
                      컬러
                      <select
                        id="color"
                        name="color"
                        onChange={async (e) => {
                          onOrderFieldChange(e, setOrderColor);
                        }}
                      >
                        <option></option>
                        <option>흑백</option>
                        <option>컬러</option>
                      </select>
                    </label>
                  )}
                </fieldset>
                <span className="moreInfoContainer">
                  <label for="moreInfo">
                    추가사항
                    <textarea
                      id="moreInfo"
                      name="moreInfo"
                      onChange={async (e) => {
                        onOrderFieldChange(e, setOrderMoreInfo);
                      }}
                      placeholder="추가요청 사항을 적어주세요!"
                    ></textarea>
                  </label>
                </span>
              </>
            )}
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
