import {
  convertDateWithDots,
  getAdminOrderConfirmList,
  getNotAdminOrderConfirmList,
  getOrderDataPageWords,
  getOrderDataSizeWords,
  getOrderStateWords,
  getOrderSubmitDate,
  onEditOrderDataSaveClick,
  onOrderConfirmStateSelect,
} from "functions/OrderConfirmFunction";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderConfirmListRouteName } from "routes/RouteName";
import { ReactComponent as ArrowLeftIconAsset } from "assets/icons/ArrowLeftIconAsset.svg";
import { ReactComponent as ArrowRightIconAsset } from "assets/icons/ArrowRightIconAsset.svg";
import { ReactComponent as OrderInfoEditIcon } from "assets/icons/OrderConfirmEditIconAsset.svg";
import { ReactComponent as OrderInfoEditDoneIcon } from "assets/icons/OrderConfirmEditDoneIconAsset.svg";
import "styles/OrderConfirmListStyle.scss";

const OrderConfirmListPage = ({ isAdmin, userObject }) => {
  const navigate = useNavigate();
  const [orderConfirmList, setOrderConfirmList] = useState([]);
  const paginationLimit = 4;
  const [paginationNowPage, setPaginationNowPage] = useState(1);
  const paginationOffset = (paginationNowPage - 1) * paginationLimit;
  const [isEditClicked, setIsEditClicked] = useState([]);
  const [newCompleteDate, setNewCompleteDate] = useState([]);
  const [newTotalMoney, setNewTotalMoney] = useState([]);
  useEffect(() => {
    if (isAdmin) {
      getAdminOrderConfirmList(setOrderConfirmList);
    } else {
      getNotAdminOrderConfirmList(setOrderConfirmList);
    }
  }, [isAdmin, userObject]);

  return (
    <div className="OrderConfirmListBody">
      <span id="OrderConfirmList_title">주문했던 내역을 확인해보세요!</span>
      <table className="OrderConfirmListContainer">
        <div className="headers">
          <th style={{ width: "50px", paddingRight: "3%" }}></th>
          <div className="header_text">
            <th>주문정보</th>
            <th>주문일자</th>
            <th>수령가능 날짜</th>
            <th>예상금액 (수량)</th>
            <th>주문 상태</th>
          </div>
          <th style={{ width: "25px" }}></th>
        </div>
        <hr id="headers_line" />
        {orderConfirmList
          .slice(paginationOffset, paginationOffset + paginationLimit)
          .map((order, i) => (
            <>
              <tr
                className="OrderConfirmView_Container"
                onClick={() => {
                  if (!isEditClicked[i]) {
                    navigate(`${OrderConfirmListRouteName}/${order.docId}`, {
                      state: { data: order },
                    });
                  }
                }}
              >
                <>
                  <td id="order_attachemnt">
                    <embed src={order.attachment}></embed>
                  </td>
                  <div id="order_text">
                    <td id="order_info">
                      <span id="info_category">
                        {order.category}/{getOrderDataSizeWords(order.size)}
                      </span>
                      <span id="info_title">{order.title}</span>
                      <span id="info_order_num">{order.docId}</span>
                    </td>
                    <td id="order_date">{getOrderSubmitDate(order)}</td>
                    {isEditClicked[i] ? (
                      <td id="order_collect_date">
                        <input
                          id="order_complete_date_input"
                          type="date"
                          value={newCompleteDate[i]}
                          onChange={(event) => {
                            const newDates = [...newCompleteDate];
                            newDates[i] = event.target.value;
                            setNewCompleteDate(newDates);
                          }}
                        />
                      </td>
                    ) : (
                      <>
                        {order.completeTime === "0" ? (
                          <>
                            <td id="order_collect_date">미정</td>
                          </>
                        ) : (
                          <>
                            <td id="order_collect_date">
                              {convertDateWithDots(order.completeTime)}
                            </td>
                          </>
                        )}
                      </>
                    )}
                    {isEditClicked[i] ? (
                      <td id="order_money">
                        <input
                          id="order_total_money_input"
                          type="text"
                          placeholder="예상 금액(수량)"
                          value={newTotalMoney[i]}
                          onChange={(event) => {
                            const newMoney = [...newTotalMoney];
                            newMoney[i] = event.target.value;
                            setNewTotalMoney(newMoney);
                          }}
                        />
                      </td>
                    ) : (
                      <>
                        {order.totalMoney === "0" ? (
                          <td id="order_money">미정</td>
                        ) : (
                          <td id="order_money">{order.totalMoney}</td>
                        )}
                      </>
                    )}

                    {isEditClicked[i] ? (
                      <td
                        id="order_state"
                        style={
                          order.state === "0"
                            ? { color: "#5A91FF" }
                            : order.state === "-1"
                            ? { color: "#BBC0C6" }
                            : { color: "#727375" }
                        }
                      >
                        <select
                          id="order_state_select"
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
                          <option value={"0"}>완료</option>
                          <option value={"1"}>준비중</option>
                          <option value={"2"}>접수중</option>
                        </select>
                      </td>
                    ) : (
                      <td
                        id="order_state"
                        style={
                          order.state === "0"
                            ? { color: "#5A91FF" }
                            : { color: "#727375" }
                        }
                      >
                        {getOrderStateWords(order.state)}
                      </td>
                    )}
                  </div>
                  {isAdmin ? (
                    order.state !== "-1" ? (
                      <td
                        key="orderEdit"
                        id="order_edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          const newIsEditClicked = [...isEditClicked];
                          newIsEditClicked[i] = !newIsEditClicked[i];
                          setIsEditClicked(newIsEditClicked);
                        }}
                      >
                        {isEditClicked[i] ? (
                          <OrderInfoEditDoneIcon
                            id="order_icon"
                            onClick={() => {
                              onEditOrderDataSaveClick(
                                order.docId,
                                newCompleteDate[i],
                                newTotalMoney[i],
                                setOrderConfirmList
                              );
                            }}
                          />
                        ) : (
                          <OrderInfoEditIcon id="order_icon" />
                        )}
                      </td>
                    ) : (
                      <td key="orderEdit" id="order_edit">
                        <OrderInfoEditIcon
                          id="order_icon"
                          style={{ display: "none" }}
                        />
                      </td>
                    )
                  ) : order.state === "2" ? (
                    <td id="order_cancel">
                      주문
                      <br />
                      취소
                    </td>
                  ) : (
                    <td id="order_cancel"></td>
                  )}
                </>
              </tr>

              {paginationLimit - 1 > i && <hr id="OrderConfirmView_line" />}
            </>
          ))}
      </table>
      <div id="OrderConfirmListFooter">
        <button
          onClick={(e) => {
            setPaginationNowPage(paginationNowPage - 1);
            setIsEditClicked([]);
            setNewCompleteDate([]);
            setNewTotalMoney([]);
          }}
          disabled={paginationNowPage === 1}
          id="arrowLeftButton"
        >
          <ArrowLeftIconAsset />
        </button>

        <div className="paginationButton">
          {Math.ceil(orderConfirmList.length / paginationLimit) <= 3 &&
            Array(Math.ceil(orderConfirmList.length / paginationLimit))
              .fill()
              .map((_, i) => (
                <button
                  key={i + 1}
                  onClick={(e) => {
                    setPaginationNowPage(i + 1);
                    setIsEditClicked([]);
                    setNewCompleteDate([]);
                    setNewTotalMoney([]);
                  }}
                  aria-current={paginationNowPage === i + 1 && "nowPage"}
                >
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
                  aria-current={paginationNowPage === i + 1 && "nowPage"}
                >
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
                  onClick={(e) => {
                    setPaginationNowPage(paginationNowPage - 2 + i);
                    setIsEditClicked([]);
                    setNewCompleteDate([]);
                    setNewTotalMoney([]);
                  }}
                  aria-current={
                    paginationNowPage === paginationNowPage - 2 + i && "nowPage"
                  }
                >
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
                  onClick={(e) => {
                    setPaginationNowPage(paginationNowPage - 1);
                    setIsEditClicked([]);
                    setNewCompleteDate([]);
                    setNewTotalMoney([]);
                  }}
                >
                  {paginationNowPage - 1}
                </button>
                <button
                  key={paginationNowPage}
                  onClick={(e) => setPaginationNowPage(paginationNowPage)}
                  aria-current="nowPage"
                >
                  {paginationNowPage}
                </button>
                <button
                  key={paginationNowPage + 1}
                  onClick={(e) => {
                    setPaginationNowPage(paginationNowPage + 1);
                    setIsEditClicked([]);
                    setNewCompleteDate([]);
                    setNewTotalMoney([]);
                  }}
                >
                  {paginationNowPage + 1}
                </button>
              </>
            )}
        </div>

        <button
          onClick={(e) => {
            setPaginationNowPage(paginationNowPage + 1);
            setIsEditClicked([]);
            setNewCompleteDate([]);
            setNewTotalMoney([]);
          }}
          disabled={
            paginationNowPage ===
            Math.ceil(orderConfirmList.length / paginationLimit)
          }
          id="arrowRightButton"
        >
          <ArrowRightIconAsset />
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmListPage;
