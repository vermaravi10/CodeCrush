import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useLogout } from "../hooks/logout";

import { setTheme } from "../utils/slices/themeSlice";

const NavBar = () => {
  const logout = useLogout();
  const dispatch = useDispatch();
  const theme = useSelector((store) => store?.theme);

  const user = useSelector((store) => store?.user?.data);

  const toggleTheme = () => {
    if (theme === "caramellatte") {
      dispatch(setTheme("sunset"));
    } else {
      dispatch(setTheme("caramellatte"));
    }
  };

  return (
    <>
      <div className="navbar flex justify-between bg-base-200 shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3 justify-start">
          <Link to="/profile/feed" className="btn btn-ghost text-xl">
            👩🏻‍💻 CodeCrush{" "}
          </Link>
          <button>
            <Link to="/profile/connections" className="btn  text-lg ">
              Connections
            </Link>
          </button>
          <button>
            <Link to="/profile/requests" className="btn  text-lg ">
              Requests
            </Link>
          </button>
        </div>

        <div className="flex gap-2">
          <div className="dropdown dropdown-end flex align-center">
            <div className="flex self-center">Hey, {user?.firstName}</div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-20 rounded-full mx-1 ">
                <img alt="User Photo" src={user?.photo_url} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-10 w-52 p-1 shadow"
            >
              <li>
                <Link to="/profile/view" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/profile/feed" className="justify-between">
                  Feed
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={toggleTheme}>
                  {theme === "caramellatte" ? (
                    <>
                      <span role="img" aria-label="moon" className="mr-2">
                        🌙
                      </span>
                      Dark Mode
                    </>
                  ) : (
                    <>
                      <span role="img" aria-label="sun" className="mr-2">
                        ☀️
                      </span>
                      Light Mode
                    </>
                  )}
                </a>
              </li>
              <li>
                <a onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
