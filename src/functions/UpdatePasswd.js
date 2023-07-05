import { authService } from "fbase";
import { sendPasswordResetEmail } from "firebase/auth";

const updatePasswd = async () => {
  const user = authService.currentUser;
  await sendPasswordResetEmail(user, user.email)
    .then(() => {
      window.alert("해당 이메일로 메세지가 전송되었습니다.");
    })
    .catch((error) => {
      window.alert("메세지 전송이 실패되었습니다.");
    });
};

export default updatePasswd;
