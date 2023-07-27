import React from "react";
import { useLocation } from "react-router";
import "styles/OrderConfirmViewStyle.scss";

import { Worker, Viewer } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { getDecryptedData } from "functions/UserFunction";

const OrderConfirmViewPage = ({ isAdmin, userObject }) => {
  const location = useLocation();
  const orderData = location.state.data;

  return (
    <div className="OrderConfirmViewBody">
      {orderData === null ? (
        <>Loading</>
      ) : (
        <div className="AllLayout">
          <div className="FileLayout">
            {orderData.attachmentName.match(/(.*?)\.(pdf)$/) && (
              <div>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={orderData.attachment}
                    httpHeaders={{
                      Authorization: "firebasestorage.googleapis.com",
                    }}
                    withCredentials={false}
                  />
                </Worker>
              </div>
            )}

            {orderData.attachmentName.match(
              /(.*?)\.(jpg|jpeg|png|gif|bmp|svg)$/
            ) && <img src={orderData.attachment} alt="attachment" />}
          </div>
          <div className="InfoLayout">
            <div className="categoryAllContent">
              <div id="categoryTitleLayout">
                <span id="category">{orderData.category}</span>
                <span id="docId">{orderData.docId}</span>
              </div>
              <hr />
              <a
                className="categoryAttachment"
                href={orderData.attachment}
                download={orderData.attachmentName}
                target="_blank"
                rel="noopener noreferrer">
                {orderData.attachmentName}
              </a>
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
                  <span className="categoryKeyUserInfo">{userObject.name}</span>
                  <span className="categoryValueUserInfo">
                    {userObject.phoneNumber}
                  </span>
                </div>
              )}
              <div className="categoryAllLayout">
                <span className="categoryKeyText">제목</span>
                <span className="categoryValueText">{orderData.title}</span>
              </div>

              <div className="categoryAllLayout">
                <span className="categoryKeyText">페이지</span>
                <span className="categoryValueText">{orderData.page}</span>
              </div>

              <div className="categoryAllLayout">
                <span className="categoryKeyText">레이아웃</span>
                <span className="categoryValueText">{orderData.layout}</span>
              </div>

              <div className="categoryAllLayout">
                <span className="categoryKeyText">사이즈</span>
                <span className="categoryValueText">{orderData.size}</span>
              </div>

              <div className="categoryAllLayout">
                <span className="categoryKeyText">제본방식</span>
                <span className="categoryValueText">
                  {orderData.bindingMethod}
                </span>
              </div>

              <div className="categoryAllLayout">
                <span className="categoryKeyText">코팅여부</span>
                <span className="categoryValueText">{orderData.coating}</span>
              </div>

              <div className="categoryAllLayout">
                <span className="categoryKeyText">종이</span>
                <span className="categoryValueText">{orderData.paper}</span>
              </div>

              <div className="categoryAllLayout">
                <span className="categoryKeyText">컬러</span>
                <span className="categoryValueText">{orderData.color}</span>
              </div>

              <div className="categoryAllLayout">
                <span className="categoryKeyText">문의사항</span>
                <span className="categoryValueText">{orderData.moreInfo}</span>
              </div>

              <div className="categoryAllLayout">
                <span className="categoryKeyText">주문상태</span>
                <span className="categoryValueText">{orderData.state}</span>
              </div>

              <div className="categoryAllLayout">
                <span className="categoryKeyText">예상가격</span>
                <span className="categoryValueText">
                  {orderData.totalMoney}
                </span>
              </div>

              <div className="categoryAllLayout">
                <span className="categoryKeyText">예상수령일</span>
                <span className="categoryValueText">
                  {orderData.completeTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmViewPage;
