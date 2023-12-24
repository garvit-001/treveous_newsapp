import { Link } from "react-router-dom";
import React from "react";
import { logout, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Favourites from "./Favourites";
import "../App.css";

const Navbar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top bg-light fs-5">
        <div className="container-fluid">
          <Link
            className="nav-link me-auto mb-2 mb-lg-0"
            aria-current="page"
            to="/"
          >
            Home
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"></li>

              <li className="nav-item">
                <Link className="nav-link" to="/business">
                  Business
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/entertainment">
                  Entertainment
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/health">
                  Health
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/science">
                  Science
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/technology">
                  Technology
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="favorites nav-item">
          <Link className="nav-link" to="/favourite">
            favourite
          </Link>
        </div>
        <div className="logout m-4 logout">
          <button onClick={() => dispatch(logout())}>logout</button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
