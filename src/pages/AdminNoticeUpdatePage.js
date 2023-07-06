import { useParams } from "react-router-dom";

const AdminNoticeUpdatePage = ({}) => {
  const { id } = useParams();
  return <div>id: {id}</div>;
};
export default AdminNoticeUpdatePage;
