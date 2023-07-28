export const onAttachmentDownloadClick = (data) => {
  fetch(data.attachment).then((response) => {
    response.blob().then((blob) => {
      const fileUrl = window.URL.createObjectURL(blob);
      let alink = document.createElement("a");
      alink.href = fileUrl;
      alink.download = data.attachmentName;
      alink.click();
    });
  });
};
