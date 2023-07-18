import {
  getOrderConfirmList,
  getOrderSubmitDate,
} from "functions/OrderConfirmFunction";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  OrderConfirmListRouteName,
  OrderConfirmViewRouteName,
} from "routes/RouteName";

const OrderConfirmListPage = () => {
  const [orderConfirmList, setOrderConfirmList] = useState([]);
  const navigate = useNavigate();

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
              {order.totalMoney} {order.state}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderConfirmListPage;
