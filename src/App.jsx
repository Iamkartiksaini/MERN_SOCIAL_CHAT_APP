import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Register from "./landing/landing_page.jsx";
import Login from "./landing/login";
import Home from "./Main/Home.jsx";
import Footer from "./Main/Footer.jsx";
import "./loading.css";
import Profile from "./Main/Profile.jsx";
import Dashboard from "./Main/Dashboard.jsx";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";

function App() {
  const [id, setID] = useState("id");
  let x = secureLocalStorage.getItem("chatApp-CurrentUser");
  const y = {
    username: "no",
    auth: false,
  };
  if (x == null) {
    secureLocalStorage.setItem("chatApp-CurrentUser", y);
  }
  return (
    <>
      <BrowserRouter>
        <div className="MainContainer">
          <header
            style={{
              backgroundColor: " rgb(0 18 20)",
              boxShadow: " rgb(255 255 255 / 85%) 15px -4px 4px 6px",
              zIndex: "23",
              position: "relative",
            }}
          >
            <h1>Chat App</h1>
            <button
              onClick={() => {
                localStorage.clear();
              }}
            >
              <a
                style={{
                  color: "white",
                }}
                href="/"
              >
                {" "}
                LogOut
              </a>
            </button>
          </header>
          <Routes>
            {id == true || x.auth == true ? (
              <>
                <Route
                  path="/Dashboard"
                  element={<Dashboard id={id} current_user={x} />}
                >
                  <Route path="home" index element={<Home />}></Route>
                  <Route path="home" element={<Home />}></Route>
                  <Route path="profile" element={<Profile />}></Route>
                  <Route path="*" element={<Home />}></Route>
                </Route>
                <Route
                  path="*"
                  element={<Dashboard id={id} logInID={x} />}
                ></Route>
              </>
            ) : (
              <>
                <Route
                  path="/sign_up"
                  element={<Register setID={setID} id={id} />}
                ></Route>
                <Route
                  path="/login"
                  element={<Login setID={setID} id={id} />}
                ></Route>
                <Route
                  path="*"
                  element={<Login setID={setID} id={id} />}
                ></Route>
              </>
            )}
          </Routes>
          {id == true || x.auth == true || x.auth == null ? <Footer /> : null}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
