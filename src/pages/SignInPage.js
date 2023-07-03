import {
  onUserEmailAndPasswordSubmit,
  onUserEmailOrPasswordChange,
} from "functions/SignInFunction";
import { useState } from "react";

const SignInPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(true);

  return (
    <div>
      <form
        onSubmit={(e) =>
          onUserEmailAndPasswordSubmit(
            e,
            userEmail,
            userPassword,
            isNewUser,
            setIsNewUser
          )
        }
      >
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
        <input type="submit" value={isNewUser ? "Sign In" : "Log In"} />
      </form>
    </div>
  );
};

export default SignInPage;
