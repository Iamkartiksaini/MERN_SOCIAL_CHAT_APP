import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
// import { v4 as uuidV4 } from "uuid";
import axios from "axios";

function Register({ setID }) {
  const idRef = useRef();
  const idRefUserID = useRef();
  const idRefUserPass = useRef();

  function submit(e) {
    e.preventDefault();
    console.log("sub of regi", idRef.current.value);
    axios
      .post("http://localhost:4000/create/user", {
        username: idRef.current.value,
        userID: idRefUserID.current.value,
        password: idRefUserPass.current.value,
      })
      .then((response) => {
        console.log("getAllUsers", response.data);
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    setID(idRef.current.value);
    // setID(uuidV4());
  }
  return (
    <>
      <div className="landing_page">
        <div>
          <h1>Chat App</h1>
          <p>Chat with your friends in real times</p>
        </div>
        {/* SignUP Page */}
        <div>
          <form action="">
            <input type="text" ref={idRef} placeholder="Username" />
            <input type="text" ref={idRefUserID} placeholder="UserID" />
            <input type="text" ref={idRefUserPass} placeholder="Password" />
            {/* <input type="text" placeholder="Password Again" /> */}
            <button type="submit" onClick={submit}>
              <NavLink to="/login/home"> Sign Up </NavLink>
            </button>
          </form>
          <button id="login_btn">
            <NavLink to="/login">Log into Account </NavLink>
          </button>
        </div>
      </div>
    </>
  );
}

export default Register;
