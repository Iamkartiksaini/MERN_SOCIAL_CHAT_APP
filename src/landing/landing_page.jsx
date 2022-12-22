import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import { v4 as uuidV4 } from "uuid";

function Register({ setID }) {
  const idRef = useRef();

  function submit(e) {
    e.preventDefault();
    console.log("sub of regi", idRef.current.value);
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
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
            <input type="text" placeholder="Password Again" />
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
