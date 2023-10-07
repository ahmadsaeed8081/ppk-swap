/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./css/App.scss";
import "./index.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

import Main from "./Pages/Home";
import Routing from "./routes/Routing";

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  var activeUser = localStorage.getItem("_user");
  const [user, setUser] = useState(false);

  return <Routing />;
}

export default App;
