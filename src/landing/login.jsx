import React, { useRef } from "react";
import { NavLink } from "react-router-dom";

function Login({ setID }) {
  const idRef = useRef();

  function submit(e) {
    e.preventDefault();
    console.log("sub of login", idRef.current.value);
    setID(idRef.current.value);
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
