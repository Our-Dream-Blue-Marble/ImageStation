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
      <span>주문했던 내역을 확인해보세요!</span>
      <div className="OrderConfirmListContainer">
        <h1>주문번호 주문일 주문 종류 예상 수령일 예상 가격 주문 상태</h1>
        <hr />
        {orderConfirmList.map((order, i) => (
          <div key={order.docId}>
            <div
              onClick={() =>
                navigate(`${OrderConfirmListRouteName}/${order.docId}`, {
                  state: { data: order },
                })
              }
            >
              {order.docId} {getOrderSubmitDate(order)} {order.category}{" "}
              {order.totalMoney}{" "}
            </div>
            <select
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
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderConfirmListPage;
