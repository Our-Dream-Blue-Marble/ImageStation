import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HomeRouteName,
  OrderCategoryPageRouteName,
  OrderConfirmListRouteName,
  OrderConfirmViewRouteName,
} from "routes/RouteName";
import {
  onOrderAttachmentChange,
  onOrderFieldChange,
  onOrderSubmit,
} from "functions/OrderFunction";
import "styles/OrderStyle.scss";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import OrderFileCancel from "../assets/OrderFileCancelAsset.svg";

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
  const [clickedOrder, setClickedOrder] = useState(false);
  const [orderUploadSuccess, setOrderUploadSuccess] = useState(false);

  useEffect(() => {
    if (orderTitle !== "" && imageUrl !== "") {
      setIsPossibleSubmit(true);
    } else {
      setIsPossibleSubmit(false);
    }
  }, [orderTitle, imageUrl]);

  return (
    <>
      {clickedOrder ? (
        <div className="OrderConfirmPopUp">
          <div className="OrderConfirmPopUpContainer">
            <div className="popUpBlueText">주문이 접수 되었습니다!</div>
            <br />
            <div className="popUpBlackText">
              주문내역확인 페이지로
              <br />
              이동할까요?
            </div>
            <div className="OrderConfirmPopUpButton">
              <button
                className="popUpHome"
                onClick={() => {
                  navigate(HomeRouteName);
                }}
              >
                홈
              </button>
              <button
                className="popUpOrderList"
                onClick={() => {
                  navigate(`${OrderConfirmListRouteName}`, {
                    state: true,
                    replace: true,
                  });
                }}
              >
                주문내역
              </button>
            </div>
          </div>
        </div>
      ) : null}
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
                    setOrderUploadSuccess(true);
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
                <div>
                  <input
                    className="FileUploadButton"
                    type="file"
                    onChange={(e) => {
                      onOrderAttachmentChange(
                        e,
                        setOrderAttachment,
                        setOrderAttachmentName,
                        setImageUrl,
                        setIsFileUploadButton,
                        setIsPdf
                      );
                    }}
                  />
                  <div className="FileUploadExplanation">
                    <br />
                    드래그를 통해서도 <br />
                    파일 업로드 가능해요
                  </div>
                </div>
              ) : (
                <button
                  className="FileCancelButton"
                  onClick={(e) => {
                    setIsFileUploadButton(true);
                    setImageUrl("");
                  }}
                >
                  <img src={OrderFileCancel} />
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
                  <div className="categoryHeader">
                    {category === "normal" && <>일반 주문예약</>}
                    {category === "binding" && <>제본 주문예약</>}
                    {category === "labeling" && <>라벨지 주문예약</>}
                    {category === "actual" && <>실사대형출력 주문예약</>}
                    {category === "photo" && <>사진인화 주문예약</>}
                  </div>
                  <div className="categorySelectBodyContainer">
                    <div className="categorySelect">
                      <fieldset>
                        <span>
                          <label>제목</label>
                          <input
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
                          <label>페이지</label>
                          <select
                            name="page"
                            onChange={async (e) => {
                              onOrderFieldChange(e, setOrderPage);
                            }}
                          >
                            <option></option>
                            <option value={0}>전체</option>
                            <option value={1}>짝수</option>
                            <option value={2}>홀수</option>
                          </select>
                        </span>
                        {(category === "normal" ||
                          category === "binding" ||
                          category === "actual") && (
                          <span>
                            <label>레이아웃</label>
                            <select
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
                        )}

                        {category !== "labeling" && (
                          <span>
                            <label>사이즈</label>
                            <select
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
                          <>
                            <span>
                              <label>
                                제본방식
                                <select
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
                            </span>

                            <span>
                              <label>
                                코팅
                                <select
                                  name="coating"
                                  onChange={async (e) => {
                                    onOrderFieldChange(e, setOrderCoating);
                                  }}
                                >
                                  <option></option>
                                  <option>코팅 있음</option>
                                  <option>코팅 없음</option>
                                </select>
                              </label>
                            </span>
                          </>
                        )}
                      </fieldset>
                      <fieldset>
                        {(category === "normal" ||
                          category === "binding" ||
                          category === "actual") && (
                          <details>
                            <summary>설정 더보기</summary>
                            <span>
                              <label>
                                종이
                                <select
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
                              <label>컬러</label>
                              <select
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
                      </fieldset>
                      {(category === "labeling" || category === "photo") && (
                        <span>
                          <label>컬러</label>
                          <select
                            name="layout"
                            onChange={async (e) => {
                              onOrderFieldChange(e, setOrderLayout);
                            }}
                          >
                            <option></option>
                            <option>컬러</option>
                            <option>흑백</option>
                          </select>
                        </span>
                      )}

                      <span className="moreInfoContainer">
                        <label>
                          주문사항
                          <textarea
                            name="moreInfo"
                            onChange={async (e) => {
                              onOrderFieldChange(e, setOrderMoreInfo);
                            }}
                            placeholder="추가요청 사항을 적어주세요!"
                          ></textarea>
                        </label>
                      </span>
                    </div>
                  </div>
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
                  setClickedOrder(true);
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default OrderPage;
