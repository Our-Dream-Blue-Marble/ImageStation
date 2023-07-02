import React from "react";
import AppRouter from "routes/AppRouter";

function App() {
  return (
    <div className="App">
      <AppRouter isLoggedIn={true} />
    </div>
  );
}

export default App;
