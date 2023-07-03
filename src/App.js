import { authService } from "fbase";
import React, { useEffect, useState } from "react";
import AppRouter from "routes/AppRouter";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObject(user);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    });
  }, []);
  return (
    <>
      {isLoading ? (
        "Looading..."
      ) : (
        <div className="App">
          <AppRouter isLoggedIn={isLoggedIn} userObj={userObject} />
        </div>
      )}
    </>
  );
}

export default App;
