/* eslint-disable react/prefer-stateless-function */
import React from "react";
import User from "./utils/Account/User";
import { BrowserRouter } from "react-router-dom";
import Routes from './routes';
import {
  Navbar
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <User.Provider>
        <Navbar />
        <Routes />
      </User.Provider>
    </BrowserRouter>
  );
}

export default App;
