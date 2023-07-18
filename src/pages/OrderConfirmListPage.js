import {
  getOrderConfirmList,
  getOrderSubmitDate,
  onOrderConfirmClick,
} from "functions/OrderConfirmFunction";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderConfirmListRouteName } from "routes/RouteName";

const OrderConfirmListPage = () => {
  const navigate = useNavigate();
  const [orderConfirmList, setOrderConfirmList] = useState([]);
  const [updatedOrderConfirmState, setUpdatedOrderConfirmState] = useState();

  useEffect(() => {
    getOrderConfirmList(setOrderConfirmList);
  }, []);
  return (
    <>
      OrderConfirmList
      <div>
        <h1>주문번호 주문일 주문 종류 예상 수령일 예상 가격 주문 상태</h1>
        <br />
        {orderConfirmList.map((order) => (
          <div key={order.docId}>
            <div
              onClick={() =>
                navigate(`${OrderConfirmListRouteName}/${order.docId}`)
              }>
              {order.docId} {getOrderSubmitDate(order)} {order.category}{" "}
              {order.totalMoney}{" "}
              <button
                onClick={() =>
                  onOrderConfirmClick(order, setUpdatedOrderConfirmState)
                }>
                주문
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderConfirmListPage;
