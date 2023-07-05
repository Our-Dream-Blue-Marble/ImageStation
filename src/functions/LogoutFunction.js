import { authService } from "fbase";

const LoggedOut = () => {

  authService.signOut();
  
};

export default LoggedOut;
