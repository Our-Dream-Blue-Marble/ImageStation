import { authService } from "fbase";
import React, { useEffect, useState } from "react";
import AppRouter from "routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { setUserModel } from "functions/UserFunction";
import { readUserDocument } from "repositories/UserRepository";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const data = await readUserDocument(authService.currentUser.uid);
        setUserObject(data);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });
  }, []);
  return (
    <BrowserRouter>
      {isLoading ? (
        "Looading..."
      ) : (
        <div className="App">
          <AppRouter isLoggedIn={isLoggedIn} userObj={userObject} />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
