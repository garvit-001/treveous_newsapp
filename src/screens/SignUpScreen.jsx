import React, { useRef } from "react";
import "./SignUpScreen.css";
import { auth } from "../firebase";

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="SignUpScreen">
      <form className="form">
        <h2>Sign In</h2>
        <div class="form-group">
          <input
            type="email"
            ref={emailRef}
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-danger" onClick={signIn}>
          Sign In
        </button>
        <h4>
          <span className="new-signup m-1">Don't Have an account?</span>
          <span className="new-signup-link" onClick={register}>
            Sign Up and login.
          </span>
          
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;
