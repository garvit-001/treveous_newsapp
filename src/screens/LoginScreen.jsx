import React, { useState } from "react";
// import HomePage from "./HomePage";
import "./LoginScreen.css";
import SignUpScreen from "./SignUpScreen";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className="loginScreen">
      <div className="root">
        <nav className="navbar">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6I0gBuePlHqYAl6RpJw17gfCtrE677bRKYmlAFhoqnLqMe7xsfKbxO--MbWhCGl18v1A&usqp=CAU"
            alt="News App Logo"
            className="logo"
          />
          <button onClick={() => setSignIn(true)} className="signIn">
            Sign In
          </button>
        </nav>
      </div>
      <div className="main">
        {!signIn ? (
          <SignUpScreen />
        ) : (
          <div>
            <h1 className="title">Unlimited News, at your fingertips.</h1>
            <h2 className="subtitle">Read anywhere. Cancel anytime.</h2>
            <h3 className="short">
              Ready to Start? Enter your email to create or restart your
              membership.
            </h3>
            {/* </div> */}
            <div className="form-div">
              <form className="form-login">
                <input
                  className="email-enter"
                  type="email"
                  placeholder="enter your email address"
                />
                <button onClick={() => setSignIn(true)} className="start">
                  Get started
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
