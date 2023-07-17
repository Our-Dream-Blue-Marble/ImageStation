import {
  getOrderConfirmList,
  getOrderSubmitDate,
} from "functions/OrderConfirmFunction";
import React, { useEffect, useState } from "react";

const OrderConfirmListPage = () => {
  const [orderConfirmList, setOrderConfirmList] = useState([]);

  useEffect(() => {
    getOrderConfirmList(setOrderConfirmList);
  }, []);
  return (
    <>
      OrderConfirmList
      <div>
        <h1>
          주문번호&nbsp;&nbsp;&nbsp;주문일&nbsp;&nbsp;&nbsp;주문
          종류&nbsp;&nbsp;&nbsp;가격&nbsp;&nbsp;&nbsp;주문 상태
        </h1>
        <br />
        {orderConfirmList.map((order) => (
          <div>
            {order.docId} {getOrderSubmitDate(order)} {order.category}{" "}
            {order.totalMoney} {order.state}
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderConfirmListPage;
