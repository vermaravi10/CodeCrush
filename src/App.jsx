import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Landing from "./components/Landing";
const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/profile" element={<Body />}>
              <Route path="feed" element={<div>feed</div>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};
export default App;
