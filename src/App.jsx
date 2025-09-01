import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Landing from "./components/Landing";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { NotificationProvider } from "./context/NotificationProvider";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import ConnectionsPage from "./components/Connections";
import ConnectionRequestsPage from "./components/ConnectionRequests";
const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <NotificationProvider>
          <BrowserRouter basename="/">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/profile" element={<Body />}>
                <Route path="feed" element={<Feed />} />
                <Route path="view" element={<Profile />} />
                <Route path="connections" element={<ConnectionsPage />} />
                <Route path="requests" element={<ConnectionRequestsPage />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </Provider>
    </>
  );
};
export default App;
