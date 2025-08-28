import React from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Body = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
