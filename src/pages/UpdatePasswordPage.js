import { useState } from "react";
import {
  onEmailChange,
  onUpdatePasswordSubmitWithEmail,
} from "functions/UpdatePasswordFunction";

const UpdatePasswordPage = () => {
  const [email, setEmail] = useState("");

  return (
    <div>
      <form onSubmit={(event) => onUpdatePasswordSubmitWithEmail(event, email)}>
        <input
          onChange={(e) => onEmailChange(e, setEmail)}
          name="email "
          type="email"
          placeholder="Email"
          value={email}
        />
        <input type="submit" value="확인" />
      </form>
    </div>
  );
};

export default UpdatePasswordPage;
