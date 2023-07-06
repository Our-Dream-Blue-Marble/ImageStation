import { dbService } from "fbase";
import { getNoticeList } from "functions/NoticeFunction";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { readNoticeDocument } from "repositories/NoticeRepository";

const AdminNoticeUpdatePage = ({}) => {
  const location = useLocation();
  const { id } = useParams();
  const [notice, setNotice] = useState([]);
  const [currentNoticeObj, setCurrentNoticeObj] = useState(location.state.data);

  useEffect(() => {
    if (currentNoticeObj === null && id !== null) {
      setCurrentNoticeObj(id).then((result) => {
        setCurrentNoticeObj(result);
      });
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`sweets/${id}`).update({
      text: currentNoticeObj,
    });
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrentNoticeObj(value);
  };
  return (
    <>
      {currentNoticeObj === null ? (
        <>Loading...</>
      ) : (
        <div>
          no: {currentNoticeObj.id} <br />
          <form onSubmit={onSubmit} className="container sweetEdit">
            <input
              type="text"
              placeholder={currentNoticeObj.title}
              value={currentNoticeObj.title}
              required
              autoFocus
              onChange={onChange}
            />
            <input type="submit" value="Update" />
          </form>
          <br />
          body: {currentNoticeObj.body}
          <br />
        </div>
      )}
    </>
  );
};

export default AdminNoticeUpdatePage;
