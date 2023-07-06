import { authService } from "fbase";
import React, { useEffect, useState } from "react";
import AppRouter from "routes/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { readUserDocument } from "repositories/UserRepository";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isKorean, setIsKorean] = useState(true);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        readUserDocument(authService.currentUser.uid).then((result) => {
          setUserObject(result);
          setIsLoading(false);
        });
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        "Looading..."
      ) : (
        <div className="App">
          <AppRouter
            isLoggedIn={isLoggedIn}
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
