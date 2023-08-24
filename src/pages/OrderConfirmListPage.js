import {
  getAdminOrderConfirmList,
  getNotAdminOrderConfirmList,
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
import PopUpWithTwoButtonsWidgets from "widgets/PopUpWithTwoButtonsWidgets";
import { updateOrderStateDocument } from "repositories/OrderRepository";

const OrderConfirmListPage = ({ isAdmin, userObject }) => {
  const navigate = useNavigate();
  const [orderConfirmList, setOrderConfirmList] = useState([]);
  const [orderConfirmSwitchList, setOrderConfirmSwitchList] = useState([]);
  const [clickedSwitchButton, setClickedSwitchButton] = useState(false);
  const paginationLimit = 5;
  const [paginationNowPage, setPaginationNowPage] = useState(1);
  const paginationOffset = (paginationNowPage - 1) * paginationLimit;
  const [isEditClicked, setIsEditClicked] = useState([]);
  const [newCompleteDate, setNewCompleteDate] = useState([]);
  const [newTotalMoney, setNewTotalMoney] = useState([]);
  const [isCancelClicked, setIsCancelClicked] = useState(false);
  const [calcelOrderId, setCalcelOrderId] = useState();

  useEffect(() => {
    if (isAdmin) {
      getAdminOrderConfirmList(setOrderConfirmList, setOrderConfirmSwitchList);
    } else {
      getNotAdminOrderConfirmList(setOrderConfirmList);
    }
  }, [isAdmin, userObject]);

  const getClassNameWithOrderState = (orderState, isGrayColor) => {
    if (orderState === "0" && !isGrayColor) {
      return "finish-order-state-style";
    } else if ((orderState === "1" || orderState === "2") && !isGrayColor) {
      return "progress-order-state-style";
    } else if (orderState === "-1" && isGrayColor) {
      return "delete-order-style";
    } else if (orderState === "-1") {
      return "delete-order-state-style";
    }
  };

  return (
    <>
      {isCancelClicked ? (
        <PopUpWithTwoButtonsWidgets
          headerText={"주문을 취소할까요?"}
          bodyText={"접수중에는 취소가 가능합니다!"}
          leftButtonText={"돌아가기"}
          rightButtonText={"주문취소"}
          isPrimaryColor={false}
          onClickLeftFunction={() => {
            setIsCancelClicked(false);
          }}
          onClickRightFunction={() => {
            updateOrderStateDocument(calcelOrderId, "-1").then((result) => {
              if (result) {
                setIsCancelClicked(false);
                window.location.replace(OrderConfirmListRouteName);
              }
            });
          }}
        />
      ) : (
        <></>
      )}
      <div className="OrderConfirmListBody">
        <span id="OrderConfirmList_title">주문했던 내역을 확인해보세요!</span>
        <div className="OrderSwitch">
          <button
            className="inputSwitchButton"
            onClick={(e) => {
              const switchList = !clickedSwitchButton;
              setClickedSwitchButton(switchList);
              if (switchList) {
                const completeList = orderConfirmList.filter(
                  (data) => data.state <= 0
                );
                setOrderConfirmSwitchList(completeList);
              } else {
                const proceedingList = orderConfirmList.filter(
                  (data) => data.state > 0
                );
                setOrderConfirmSwitchList(proceedingList);
              }
            }}>
            {clickedSwitchButton
              ? "진행중인 주문내역 보기"
              : "완료된 주문내역 보기"}
          </button>
        </div>
        <table className="OrderConfirmListContainer">
          <div className="headers">
            <th style={{ width: "50px", paddingRight: "3%" }}></th>
            <div className="header_text">
              <th>주문정보</th>
              <th>주문일자</th>
              <th>완료요청 일시</th>
              <th>수령가능 날짜</th>
              <th>예상금액 (수량)</th>
              <th>주문 상태</th>
            </div>
            <th style={{ width: "25px" }}></th>
          </div>
          <hr id="headers_line" />
          {orderConfirmSwitchList
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
                  }}>
                  <>
                    <td id="order_attachemnt">
                      <embed src={order.attachment}></embed>
                    </td>
                    <div id="order_text">
                      <td id="order_info">
                        <span
                          id="info_category"
                          className={getClassNameWithOrderState(
                            order.state,
                            true
                          )}>
                          {order.category === "normal" && "일반"}
                          {order.category === "binding" && "제본"}
                          {order.category === "labeling" && "라벨지"}
                          {order.category === "actual" && "실사대형출력"}
                          {order.category === "photo" && "사진인화"}
                          {order.category === "etc" && "기타"}/
                          {getOrderDataSizeWords(order.size)}
                        </span>
                        <span
                          id="info_title"
                          className={getClassNameWithOrderState(
                            order.state,
                            true
                          )}>
                          {order.title}
                        </span>
                        <span
                          id="info_order_num"
                          className={getClassNameWithOrderState(
                            order.state,
                            true
                          )}>
                          {order.docId}
                        </span>
                      </td>
                      <td
                        id="order_date"
                        className={getClassNameWithOrderState(
                          order.state,
                          true
                        )}>
                        {getOrderSubmitDate(order.docId)}
                      </td>
                      <td
                        id="order_date"
                        className={getClassNameWithOrderState(
                          order.state,
                          true
                        )}>
                        {getOrderSubmitDate(order.userRequestCompleteTime)}
                      </td>
                      {isEditClicked[i] ? (
                        <td id="order_collect_date">
                          <input
                            id="order_complete_date_input"
                            type="datetime-local"
                            value={newCompleteDate[i]}
                            onChange={(event) => {
                              const newDates = [...newCompleteDate];
                              newDates[i] = event.target.value;
                              setNewCompleteDate(newDates);
                            }}
                          />
                        </td>
                      ) : (
                        <div
                          className={getClassNameWithOrderState(
                            order.state,
                            true
                          )}
                          id="order_collect_date">
                          {order.adminCompleteTime === "0"
                            ? "미정"
                            : `${getOrderSubmitDate(order.adminCompleteTime)}`}
                        </div>
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
                        <td
                          className={getClassNameWithOrderState(
                            order.state,
                            true
                          )}
                          id="order_money">
                          {order.totalMoney === "0"
                            ? "미정"
                            : `${order.totalMoney}`}
                        </td>
                      )}

                      {isEditClicked[i] ? (
                        <td
                          className={getClassNameWithOrderState(
                            order.state,
                            true
                          )}
                          id="order_state"
                          // style={
                          //   (order.state === "0" && { color: "#5A91FF" }) ||
                          //   (order.state === "-1" && { color: "#DD5257" }) || {
                          //     color: "#727375",
                          //   }
                          // }
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
                            }>
                            <option value={"0"}>완료</option>
                            <option value={"1"}>준비중</option>
                            <option value={"2"}>접수중</option>
                          </select>
                        </td>
                      ) : (
                        <td
                          className={getClassNameWithOrderState(
                            order.state,
                            false
                          )}
                          id="order_state">
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
                          }}>
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
                      <td
                        id="order_cancel"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCalcelOrderId(order.docId);
                          setIsCancelClicked(true);
                        }}>
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
            id="arrowLeftButton">
            <ArrowLeftIconAsset />
          </button>

          <div className="paginationButton">
            {Math.ceil(orderConfirmSwitchList.length / paginationLimit) <= 3 &&
              Array(Math.ceil(orderConfirmSwitchList.length / paginationLimit))
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
                    aria-current={paginationNowPage === i + 1 && "nowPage"}>
                    {i + 1}
                  </button>
                ))}
            {Math.ceil(orderConfirmSwitchList.length / paginationLimit) > 3 &&
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
            {Math.ceil(orderConfirmSwitchList.length / paginationLimit) > 3 &&
              paginationNowPage ===
                Math.ceil(orderConfirmSwitchList.length / paginationLimit) &&
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
                      paginationNowPage === paginationNowPage - 2 + i &&
                      "nowPage"
                    }>
                    {paginationNowPage - 2 + i}
                  </button>
                ))}

            {Math.ceil(orderConfirmSwitchList.length / paginationLimit) > 3 &&
              paginationNowPage !== 1 &&
              paginationNowPage !==
                Math.ceil(orderConfirmSwitchList.length / paginationLimit) && (
                <>
                  <button
                    key={paginationNowPage - 1}
                    onClick={(e) => {
                      setPaginationNowPage(paginationNowPage - 1);
                      setIsEditClicked([]);
                      setNewCompleteDate([]);
                      setNewTotalMoney([]);
                    }}>
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
                    onClick={(e) => {
                      setPaginationNowPage(paginationNowPage + 1);
                      setIsEditClicked([]);
                      setNewCompleteDate([]);
                      setNewTotalMoney([]);
                    }}>
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
              Math.ceil(orderConfirmSwitchList.length / paginationLimit)
            }
            id="arrowRightButton">
            <ArrowRightIconAsset />
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmListPage;
