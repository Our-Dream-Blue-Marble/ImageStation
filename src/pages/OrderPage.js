const OrderPage = () => {
  return (
    <div>
      <form onSubmit={async (e) => {}}>
        <ul>
          <li>
            <label for="title">제목</label>
            <input if="title" type="text" />
          </li>
          <li>
            <label for="page">페이지</label>
            <select id="page">
              <option>짝수</option>
              <option>홀수</option>
            </select>
          </li>
          <li>
            <lable for="layout">레이아웃</lable>
            <select id="layout">
              <option>가로 방향</option>
              <option>세로 방향</option>
            </select>
          </li>
          <li>
            <label for="size">사이즈</label>
            <select id="size">
              <option>A2</option>
              <option>A3</option>
              <option>A4</option>
              <option>A5</option>
            </select>
          </li>
        </ul>
        <ul>
          <details>
            <summary>설정 더보기</summary>
            <li>
              <lable for="paper">종이</lable>
              <select id="paper">
                <option>스노우지</option>
                <option>마시멜로우지</option>
              </select>
            </li>
            <li>
              <lable for="color">컬러</lable>
              <select id="color">
                <option>빨간색</option>
                <option>파란색</option>
                <option>아이보리색</option>
                <option>검은색</option>
              </select>
            </li>
          </details>
        </ul>
        <label for="request">주문사항</label>
        <textarea
          id="request"
          placeholder="추가요청 사항을 적어주세요!"
        ></textarea>
        <input type="submit" value={"주문하기"} />
        <input type="reset" value={"취소하기"} />
      </form>
    </div>
  );
};

export default OrderPage;
