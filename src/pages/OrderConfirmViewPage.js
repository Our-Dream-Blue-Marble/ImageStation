import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import "styles/OrderConfirmViewStyle.scss";

import { Worker, Viewer } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { getDecryptedData } from "functions/UserFunction";
import { onAttachmentDownloadClick } from "functions/CommonFunction";
import { readOrderDocument } from "repositories/OrderRepository";
import { OrderConfirmListRouteName } from "routes/RouteName";

import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { RenderCurrentPageLabelProps } from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import {
  convertDateWithDots,
  getOrderDataBindingMethodWords,
  getOrderDataLayoutWords,
  getOrderDataPageWords,
  getOrderDataPaperWords,
  getOrderDataSizeWords,
  getOrderStateWords,
  getOrderSubmitDate,
} from "functions/OrderConfirmFunction";
import LoadingWidgets from "widgets/LoadingWidgets";
import ErrorPage from "./ErrorPage";

const OrderConfirmViewPage = ({ isAdmin, userObject }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const { id } = useParams();
  const [isError, setIsError] = useState(false);
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const { CurrentPageLabel } = pageNavigationPluginInstance;

  useEffect(() => {
    if (orderData === null && id !== null) {
      if (location.state === null) {
        readOrderDocument(id).then(async (result) => {
          if (result) {
            const orderValue = await result.userDocRef.get();
            result.userDocRef = orderValue.data();
            setOrderData(result);
          } else {
            setIsError(true);
          }
        });
      } else {
        setOrderData(location.state.data);
      }
    }
  }, [id, location.state, orderData]);
  return (
    <>
      {orderData === null ? (
        isError ? (
          <ErrorPage />
        ) : (
          <LoadingWidgets />
        )
      ) : (
        <div className="orderConfirmLayout">
          <div className="OrderConfirmViewBody">
            <>
              <div className="AllLayout">
                <div className="FileLayout">
                  <CurrentPageLabel>
                    {(props: RenderCurrentPageLabelProps) => (
                      <div className="pageNumberContainer">{`${
                        props.currentPage + 1
                      } / ${props.numberOfPages}`}</div>
                    )}
                  </CurrentPageLabel>
                  {orderData.attachmentName.match(/(.*?)\.(pdf)$/) && (
                    <div className="pdfFileContainer">
                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                        <Viewer
                          fileUrl={orderData.attachment}
                          httpHeaders={{
                            Authorization: "firebasestorage.googleapis.com",
                          }}
                          withCredentials={false}
                          plugins={[pageNavigationPluginInstance]}
                        />
                      </Worker>
                    </div>
                  )}

                  {orderData.attachmentName.match(
                    /(.*?)\.(jpg|jpeg|png|gif|bmp|svg)$/
                  ) && (
                    <img
                      src={orderData.attachment}
                      alt="attachment"
                      className="imageFileLayout"
                    />
                  )}
                </div>
                <div className="InfoLayout">
                  <div className="categoryAllContent">
                    <div className="orderConfirmViewHeader">
                      <div id="categoryTitleLayout">
                        <span id="category">
                          {orderData.category === "normal" && "일반"}
                          {orderData.category === "binding" && "제본"}
                          {orderData.category === "labeling" && "라벨지"}
                          {orderData.category === "actual" && "실사대형출력"}
                          {orderData.category === "photo" && "사진인화"}
                          {orderData.category === "etc" && "기타"}
                        </span>
                        <span id="docId">{orderData.docId}</span>
                      </div>

                      <div
                        className="categoryAttachment"
                        onClick={() => onAttachmentDownloadClick(orderData)}
                      >
                        {orderData.attachmentName}
                      </div>
                      {isAdmin ? (
                        <div className="categoryUserInfoLayout">
                          <span className="categoryKeyUserInfo">
                            {getDecryptedData(
                              orderData.userDocRef.uid,
                              orderData.userDocRef.name
                            )}
                          </span>
                          <span className="categoryValueUserInfo">
                            {getDecryptedData(
                              orderData.userDocRef.uid,
                              orderData.userDocRef.phoneNumber
                            )}
                          </span>
                        </div>
                      ) : (
                        <div className="categoryUserInfoLayout">
                          <span className="categoryKeyUserInfo">
                            {userObject.name}
                          </span>
                          <span className="categoryValueUserInfo">
                            {userObject.phoneNumber}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="categoryAll">
                      <div className="categoryAllLayout">
                        <span className="categoryKeyText">제목</span>
                        <span className="categoryValueText">
                          {orderData.title}
                        </span>
                      </div>
                      <div className="categoryAllLayout">
                        <span className="categoryKeyText">완료요청일시</span>
                        <span className="categoryValueText">
                          {getOrderSubmitDate(
                            orderData.userRequestCompleteTime
                          )}
                        </span>
                      </div>
                      <div className="categoryAllLayout">
                        <span className="categoryKeyText">페이지</span>
                        <span className="categoryValueText">
                          {getOrderDataPageWords(orderData.page)}
                        </span>
                      </div>

                      <div className="categoryAllLayout">
                        <span className="categoryKeyText">레이아웃</span>
                        <span className="categoryValueText">
                          {getOrderDataLayoutWords(orderData.layout)}
                        </span>
                      </div>

                      <div className="categoryAllLayout">
                        <span className="categoryKeyText">사이즈</span>
                        <span className="categoryValueText">
                          {getOrderDataSizeWords(orderData.size)}
                        </span>
                      </div>

                      {orderData.bindingMethod === "" ? null : (
                        <div className="categoryAllLayout">
                          <span className="categoryKeyText">제본방식</span>
                          <span className="categoryValueText">
                            {getOrderDataBindingMethodWords(
                              orderData.bindingMethod
                            )}
                          </span>
                        </div>
                      )}

                      {orderData.coating ? (
                        <div className="categoryAllLayout">
                          <span className="categoryKeyText">코팅여부</span>
                          <span className="categoryValueText">코팅 있음</span>
                        </div>
                      ) : null}

                      {orderData.paper === "" ? null : (
                        <div className="categoryAllLayout">
                          <span className="categoryKeyText">종이</span>
                          <span className="categoryValueText">
                            {getOrderDataPaperWords(orderData.paper)}
                          </span>
                        </div>
                      )}

                      <div className="categoryAllLayout">
                        <span className="categoryKeyText">컬러</span>
                        <span className="categoryValueText">
                          {orderData.color ? "컬러" : "흑백"}
                        </span>
                      </div>

                      <div className="categoryAllLayout">
                        <span className="categoryKeyText">요청사항</span>
                        <span className="categoryValueText">
                          {orderData.moreInfo === "" ? (
                            "입력 사항 없음"
                          ) : (
                            <>{orderData.moreInfo}</>
                          )}
                        </span>
                      </div>

                      <div className="categoryAllLayout">
                        <span className="categoryKeyText">주문상태</span>
                        <span className="categoryValueText">
                          {getOrderStateWords(orderData.state)}
                        </span>
                      </div>

                      <div className="categoryAllLayout">
                        <span className="categoryKeyText">예상가격</span>
                        <span className="categoryValueText">
                          {orderData.totalMoney === "0" ? (
                            "미정"
                          ) : (
                            <>{orderData.totalMoney}</>
                          )}
                        </span>
                      </div>

                      <div className="categoryAllLayout">
                        <span className="categoryKeyText">예상수령일</span>
                        <span className="categoryValueText">
                          {orderData.adminCompleteTime === "0" ? (
                            "미정"
                          ) : (
                            <>
                              {convertDateWithDots(orderData.adminCompleteTime)}
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="navigateButtonSection">
                <button
                  className="navigateButton"
                  onClick={() => navigate(OrderConfirmListRouteName)}
                >
                  돌아가기
                </button>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderConfirmViewPage;
