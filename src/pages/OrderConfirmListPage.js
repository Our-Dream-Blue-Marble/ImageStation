import {
  getOrderConfirmList,
  getOrderConfirmStateWord,
  getOrderSubmitDate,
  onOrderConfirmClick,
} from "functions/OrderConfirmFunction";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderConfirmListRouteName } from "routes/RouteName";

const OrderConfirmListPage = () => {
  const navigate = useNavigate();
  const [orderConfirmList, setOrderConfirmList] = useState([]);

  useEffect(() => {
    getOrderConfirmList(setOrderConfirmList);
  }, []);
  return (
    <>
      OrderConfirmList
      <div>
        <h1>주문번호 주문일 주문 종류 예상 수령일 예상 가격 주문 상태</h1>
        <br />
        {orderConfirmList.map((order, i) => (
          <div key={order.docId}>
            <div
              onClick={() =>
                navigate(`${OrderConfirmListRouteName}/${order.docId}`, {
                  state: { data: order },
                })
              }>
              {order.docId} {getOrderSubmitDate(order)} {order.category}{" "}
              {order.totalMoney}{" "}
            </div>
            {order.state !== 0 ? (
              <button
                onClick={() =>
                  onOrderConfirmClick(
                    order,
                    orderConfirmList,
                    setOrderConfirmList,
                    i
                  )
                }>
                {getOrderConfirmStateWord(order.state)}
              </button>
            ) : (
              <button>완료</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderConfirmListPage;
