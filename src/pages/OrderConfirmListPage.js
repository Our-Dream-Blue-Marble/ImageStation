import {
  getAdminOrderConfirmList,
  getNotAdminOrderConfirmList,
  getOrderSubmitDate,
  onOrderConfirmStateSelect,
} from "functions/OrderConfirmFunction";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderConfirmListRouteName } from "routes/RouteName";
import { ReactComponent as ArrowLeftIconAsset } from "assets/icons/ArrowLeftIconAsset.svg";
import { ReactComponent as ArrowRightIconAsset } from "assets/icons/ArrowRightIconAsset.svg";
import "styles/OrderConfirmListStyle.scss";

const OrderConfirmListPage = ({ isAdmin, userObject }) => {
  const navigate = useNavigate();
  const [orderConfirmList, setOrderConfirmList] = useState([]);
  const paginationLimit = 4;
  const [paginationNowPage, setPaginationNowPage] = useState(1);
  const paginationOffset = (paginationNowPage - 1) * paginationLimit;

  useEffect(() => {
    if (isAdmin) {
      getAdminOrderConfirmList(setOrderConfirmList);
    } else {
      getNotAdminOrderConfirmList(userObject, setOrderConfirmList);
    }
  }, [isAdmin, userObject]);

  return (
    <div className="OrderConfirmListBody">
      <span id="OrderConfirmList_title">주문했던 내역을 확인해보세요!</span>
      <table className="OrderConfirmListContainer">
        <div className="headers">
          <th style={{ width: "50px" }}></th>
          <th className="header_text">주문정보</th>
          <th className="header_text">주문일자</th>
          <th className="header_text">주문번호</th>
          <th className="header_text">총 금액(수량)</th>
          <th className="header_text">주문 상태</th>
        </div>
        <hr id="headers_line" />
        {orderConfirmList
          .slice(paginationOffset, paginationOffset + paginationLimit)
          .map((order, i) => (
            <>
              <tr
                className="OrderConfirmView_Container"
                onClick={() =>
                  navigate(`${OrderConfirmListRouteName}/${order.docId}`, {
                    state: { data: order },
                  })
                }>
                <td id="order_attachemnt">
                  <embed src={order.attachment}></embed>
                </td>
                <td id="order_info">
                  <span id="info_category">{order.category}</span>
                  <span id="info_title">{order.title}</span>
                  <span id="info_paper">{order.size}</span>
                </td>
                <td id="order_date">{getOrderSubmitDate(order)}</td>
                <td id="order_num">{order.docId}</td>
                <td id="order_money">{order.totalMoney}</td>
                <td id="order_state"></td>
              </tr>
              {paginationLimit - 1 > i && <hr id="OrderConfirmView_line" />}
            </>
          ))}
      </table>
      <div id="OrderConfirmListFooter">
        <button
          onClick={(e) => setPaginationNowPage(paginationNowPage - 1)}
          disabled={paginationNowPage === 1}
          id="arrowLeftButton">
          <ArrowLeftIconAsset />
        </button>

        <div className="paginationButton">
          {Math.ceil(orderConfirmList.length / paginationLimit) <= 3 &&
            Array(3)
              .fill()
              .map((_, i) => (
                <button
                  key={i + 1}
                  onClick={(e) => setPaginationNowPage(i + 1)}
                  aria-current={paginationNowPage === i + 1 && "nowPage"}>
                  {i + 1}
                </button>
              ))}
          {Math.ceil(orderConfirmList.length / paginationLimit) > 3 &&
            paginationNowPage === 1 &&
            Array(3)
              .fill()
              .map((_, i) => (
                <button
                  key={i + 1}
                  onClick={(e) => setPaginationNowPage(i + 1)}
                  aria-current={paginationNowPage === i + 1 && "nowPage"}>
                  {i + 1}
                </button>
              ))}
          {Math.ceil(orderConfirmList.length / paginationLimit) > 3 &&
            paginationNowPage ===
              Math.ceil(orderConfirmList.length / paginationLimit) &&
            Array(3)
              .fill()
              .map((_, i) => (
                <button
                  key={paginationNowPage - 2 + i}
                  onClick={(e) =>
                    setPaginationNowPage(paginationNowPage - 2 + i)
                  }
                  aria-current={
                    paginationNowPage === paginationNowPage - 2 + i && "nowPage"
                  }>
                  {paginationNowPage - 2 + i}
                </button>
              ))}

          {Math.ceil(orderConfirmList.length / paginationLimit) > 3 &&
            paginationNowPage !== 1 &&
            paginationNowPage !==
              Math.ceil(orderConfirmList.length / paginationLimit) && (
              <>
                <button
                  key={paginationNowPage - 1}
                  onClick={(e) => setPaginationNowPage(paginationNowPage - 1)}>
                  {paginationNowPage - 1}
                </button>
                <button
                  key={paginationNowPage}
                  onClick={(e) => setPaginationNowPage(paginationNowPage)}
                  aria-current="nowPage">
                  {paginationNowPage}
                </button>
                <button
                  key={paginationNowPage + 1}
                  onClick={(e) => setPaginationNowPage(paginationNowPage + 1)}>
                  {paginationNowPage + 1}
                </button>
              </>
            )}
        </div>

        <button
          onClick={(e) => setPaginationNowPage(paginationNowPage + 1)}
          disabled={
            paginationNowPage ===
            Math.ceil(orderConfirmList.length / paginationLimit)
          }
          id="arrowRightButton">
          <ArrowRightIconAsset />
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmListPage;
