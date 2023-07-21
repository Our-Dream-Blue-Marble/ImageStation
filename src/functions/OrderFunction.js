import { createNewOrderDocument } from "repositories/OrderRepository";

export const onOrderSubmit = async (
  event,
  category,
  Title,
  Page,
  Layout,
  Size,
  Binding,
  Coating,
  Paper,
  Color,
  MoreInfo,
  Attachment,
  AttachmentName
) => {
  event.preventDefault();
  let result = false;
  await createNewOrderDocument(
    category,
    Title,
    Page,
    Layout,
    Size,
    Binding,
    Coating,
    Paper,
    Color,
    MoreInfo,
    Attachment,
    AttachmentName
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

export const onOrderFieldChange = (event, setValue) => {
  const {
    target: { name, value },
  } = event;
  if (name === "title") {
    setValue(value);
  } else if (name === "page") {
    setValue(value);
  } else if (name === "layout") {
    setValue(value);
  } else if (name === "size") {
    setValue(value);
  } else if (name === "binding") {
    setValue(value);
  } else if (name === "coating") {
    setValue(value);
  } else if (name === "paper") {
    setValue(value);
  } else if (name === "color") {
    setValue(value);
  } else if (name === "moreInfo") {
    setValue(value);
  }
};
