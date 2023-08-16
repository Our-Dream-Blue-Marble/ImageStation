import { authService } from "fbase";
import React, { useEffect, useState } from "react";
import AppRouter from "routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { readUserDocument } from "repositories/UserRepository";
import ScrollToTop from "ScrollToTop";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(null);
  const [isKorean, setIsKorean] = useState(true);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        if (user.emailVerified) {
          setIsEmailVerified(true);
        }
        setIsLoggedIn(true);
        readUserDocument(authService.currentUser.uid).then((result) => {
          setUserObject(result);
          setIsLoading(false);
        });
      } else {
        setIsLoggedIn(false);
        setIsEmailVerified(false);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {isLoading && isEmailVerified === null ? (
        "Looading..."
      ) : (
        <div className="App">
          <AppRouter
            isLoggedIn={isLoggedIn}
            isEmailVerified={isEmailVerified}
            isKorean={isKorean}
            setIsKorean={setIsKorean}
            userObject={userObject}
          />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
