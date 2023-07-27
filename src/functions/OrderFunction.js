import { createNewOrderDocument } from "repositories/OrderRepository";
import { storageService } from "fbase";
import moment from "moment";
import "moment/locale/ko";
import "@react-pdf-viewer/core/lib/styles/index.css";

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
  const docId = Date.now();
  let attachmentUrl = await uploadOrderAttachmentOnStorage(
    AttachmentName,
    Attachment,
    docId
  );

  await createNewOrderDocument(
    docId,
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
    attachmentUrl,
    AttachmentName
  )
    .then(() => {
      result = true;
    })
    .catch((e) => {
      console.log(e);
    });
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

export const onOrderAttachmentChange = (
  event,
  setOrderAttachment,
  setOrderAttachmentName,
  setImageUrl,
  setIsFileUploadButton,
  setIsPdf
) => {
  const {
    target: { files },
  } = event;
  const orderFile = files[0];
  const orderFileName = orderFile.name;
  setOrderAttachmentName(orderFileName);
  const orderFileReader = new FileReader();
  orderFileReader.onloadend = (finishedEvent) => {
    const {
      currentTarget: { result },
    } = finishedEvent;
    setOrderAttachment(result);
  };
  orderFileReader.readAsDataURL(orderFile);
  setImageUrl(URL.createObjectURL(files[0]));
  setIsFileUploadButton(false);
  if (orderFileName.match(".pdf")) setIsPdf(true);
  else if (
    orderFileName.match(".png") ||
    orderFileName.match(".jpg") ||
    orderFileName.match(".jpeg") ||
    orderFileName.match(".gif") ||
    orderFileName.match(".bmp") ||
    orderFileName.match(".svg")
  ) {
    setIsPdf(false);
  }
};

const uploadOrderAttachmentOnStorage = async (
  attachmentName,
  attachment,
  docid
) => {
  var filename = attachmentName;
  var fileLength = filename.length;
  var lastDot = filename.lastIndexOf(".");
  var type = filename.substring(lastDot + 1, fileLength);
  const newattachmentName = docid + "." + type;
  const orderTime = moment().format("YYYYMMDD");
  const attachmentRef = storageService
    .ref()
    .child(`orders/${orderTime}/${newattachmentName}`);
  const response = await attachmentRef.putString(attachment, "data_url");
  const bucketName = response.ref.bucket;

  const encodedAttachmentName = encodeURIComponent(newattachmentName);

  const httpsUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/orders%2F${orderTime}%2F${encodedAttachmentName}?alt=media`;
  return httpsUrl;
};
