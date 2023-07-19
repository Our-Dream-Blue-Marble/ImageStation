import { createNewOrderDocument } from "repositories/OrderRepository";

export const onOrderSubmit = async (
  event,
  title,
  page,
  layout,
  size,
  paper,
  color,
  moreInfo
) => {
  event.preventDefault();
  let result = false;
  await createNewOrderDocument(
    title,
    page,
    layout,
    size,
    paper,
    color,
    moreInfo
  )
    .then(() => {
      result = true;
    })
    .catch((e) => {
      console.log(e);
    });
  window.confirm("주문이 접수되었습니다!");
  return result;
};

export const onOrderTitleChange = (event, setValue) => {
  const {
    target: { name, value },
  } = event;
  if (name === "") {
    setValue(value);
  } else if (name === "") {
    setValue(value);
  }
};
