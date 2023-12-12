import React, { useState } from "react";
import Home from "./pages/home";
import Login from "./pages/login";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";

//import "./styles.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
