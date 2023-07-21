import React from "react";
import { useLocation } from "react-router";
import "styles/OrderConfirmViewStyle.scss";

import { Worker, Viewer } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";

const OrderConfirmViewPage = () => {
  const location = useLocation();
  const orderData = location.state.data;

  return (
    <div className="OrderConfirmViewBody">
      {orderData === null ? (
        <>Loading</>
      ) : (
        <>
          <div className="FileLayout">
            {orderData.attachmentName.match(/(.*?)\.(pdf)$/) ? (
              <>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <div
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.3)",
                      height: "600px",
                    }}
                  >
                    <Viewer
                      fileUrl={orderData.attachment}
                      httpHeaders={{
                        Authorization: "firebasestorage.googleapis.com",
                      }}
                      withCredentials={false}
                    />
                  </div>
                </Worker>
              </>
            ) : orderData.attachmentName.match(
                /(.*?)\.(jpg|jpeg|png|gif|bmp|svg)$/
              ) ? (
              <>{<img src={orderData.attachment} />}</>
            ) : (
              <div> error</div>
            )}
          </div>
          <div className="InfoLayout">
            {orderData.category}
            <span id="title_docId_caption">주문번호</span>
            {orderData.docId}
            <div>{orderData.attachmentName}</div>
            <div>
              <span className="categoryKeyText">제목</span>
              <span className="categoryValueText">{orderData.title}</span>
            </div>
            <div>
              <span className="categoryKeyText">페이지</span>
              <span className="categoryValueText">{orderData.page}</span>
            </div>
            <div>
              <span className="categoryKeyText">레이아웃</span>
              <span className="categoryValueText">{orderData.layout}</span>
            </div>
            <div>
              <span className="categoryKeyText">사이즈</span>
              <span className="categoryValueText">{orderData.size}</span>
            </div>
            <div>
              <span className="categoryKeyText">제본방식</span>
              <span className="categoryValueText">
                {orderData.bindingMethod}
              </span>
            </div>
            <div>
              <span className="categoryKeyText">코팅여부</span>
              <span className="categoryValueText">{orderData.coating}</span>
            </div>
            <div>
              <span className="categoryKeyText">종이</span>
              <span className="categoryValueText">{orderData.paper}</span>
            </div>
            <div>
              <span className="categoryKeyText">컬러</span>
              <span className="categoryValueText">{orderData.color}</span>
            </div>
            <div>
              <span className="categoryKeyText">문의사항</span>
              <span className="categoryValueText">{orderData.moreInfo}</span>
            </div>
            <div>
              <span className="categoryKeyText">주문상태</span>
              <span className="categoryValueText">{orderData.state}</span>
            </div>
            <div>
              <span className="categoryKeyText">예상가격</span>
              <span className="categoryValueText">{orderData.totalMoney}</span>
            </div>
            <div>
              <span className="categoryKeyText">예상수령일</span>
              <span className="categoryValueText">
                {orderData.completeTime}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderConfirmViewPage;
