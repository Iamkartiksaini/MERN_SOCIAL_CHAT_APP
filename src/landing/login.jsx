import axios from "axios";
import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function Login({ setID, id }) {
  const idRef = useRef();
  const idRefUserPass = useRef();

  function submit(e) {
    e.preventDefault();
    const x = {
      userID: idRef.current.value,
      password: idRefUserPass.current.value,
    };
    axios
      .post("http://localhost:4000", {
        userID: idRef.current.value,
        password: idRefUserPass.current.value,
      })
      .then((response) => {
        console.log("response User", response);
        if (response.status !== 404) {
          setID(true);
          const x = {
            username: response.data[0].username,
            userID: response.data[0].userID,
            friends: response.data[0].friends,
            auth: true,
          };
          secureLocalStorage.setItem("chatApp-CurrentUser", x);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  return (
    <>
      <div className="landing_page">
        <div>
          <h1>Chat App</h1>
          <p>Chat with your friends in real times</p>
        </div>
        <div>
          <form action="">
            <input type="text" ref={idRef} placeholder="Username" />
            <input type="text" ref={idRefUserPass} placeholder="Password" />
            <button type="submit" onClick={submit}>
              Login
            </button>
          </form>
          <button id="login_btn">
            <NavLink to="/sign_up">Create a New Account </NavLink>
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
