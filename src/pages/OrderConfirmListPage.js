import {
  getOrderConfirmList,
  getOrderSubmitDate,
  onOrderConfirmStateSelect,
} from "functions/OrderConfirmFunction";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderConfirmListRouteName } from "routes/RouteName";
import "styles/OrderConfirmListStyle.scss";

const OrderConfirmListPage = () => {
  const navigate = useNavigate();
  const [orderConfirmList, setOrderConfirmList] = useState([]);

  useEffect(() => {
    getOrderConfirmList(setOrderConfirmList);
  }, []);

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
        {orderConfirmList.map((order, i) => (
          <>
            <tr
              key={order.docId}
              className="OrderConfirmView_Container"
              onClick={() =>
                navigate(`${OrderConfirmListRouteName}/${order.docId}`, {
                  state: { data: order },
                })
              }
            >
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
              <td id="order_state">
                {order.state === 0 && "완료"}
                {order.state === 1 && "주문완료"}
                {order.state === 2 && "준비중"}
                {/* <select
                  value={order.state}
                  onChange={(e) =>
                    onOrderConfirmStateSelect(
                      e,
                      order,
                      orderConfirmList,
                      setOrderConfirmList,
                      i
                    )
                  }
                >
                  <option value={0}>완료</option>
                  <option value={1}>주문</option>
                  <option value={2}>접수</option>
                </select> */}
              </td>
            </tr>
            <hr id="OrderConfirmView_line" />
          </>
        ))}
      </table>
      <div id="OrderConfirmListFooter">1</div>
    </div>
  );
};

export default OrderConfirmListPage;
