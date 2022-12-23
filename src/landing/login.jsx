import axios from "axios";
import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

function Login({ setID }) {
  const idRef = useRef();
  const [first, setfirst] = useState("ok");

  function submit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000", { userID: idRef.current.value })
      .then((response) => {
        console.log("response User", response);
        if (response.status !== 404) {
          setID(response.data[0].username);
        }
      })
      .catch((error) => {
        setfirst(error.message);
      });
  }
  return (
    <>
      <div className="landing_page">
        <div>
          <h1>Chat App</h1>
          <p>Chat with your friends in real times</p>
          <p>{first === "ok" ? null : first}</p>
        </div>
        <div>
          <form action="">
            <input type="text" ref={idRef} placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button type="submit" onClick={submit}>
              Login
            </button>
          </form>
          {/* <p style={{color:"grey"}}>forget Password ?</p> */}
          <button id="login_btn">
            <NavLink to="/sign_up">Create a New Account </NavLink>
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
