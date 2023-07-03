import { onUserEmailOrPasswordChange } from "functions/SignInFunction";
import { useState } from "react";

const SignInPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <div>
      <form>
        <input
          name="userEmail"
          type="email"
          placeholder="Email"
          required
          value={userEmail}
          onChange={(e) => onUserEmailOrPasswordChange(e, setUserEmail)}
        />
        <input
          name="userPassword"
          type="password"
          placeholder="Password"
          required
          value={userPassword}
          onChange={(e) => onUserEmailOrPasswordChange(e, setUserPassword)}
        />
      </form>
    </div>
  );
};

export default SignInPage;
