import React, { useState, useEffect } from "react";
import LoginScreen from "./screens/LoginScreen";
import { login, logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import Homepage from "./screens/Homepage";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [logout, setLogout] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // console.log("logged in");
        console.log(userAuth);
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // console.log("logout")
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      {!user ? <LoginScreen /> : <Homepage />}
    </div>
  );
}

export default App;
