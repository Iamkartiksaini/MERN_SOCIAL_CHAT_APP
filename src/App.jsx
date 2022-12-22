import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Register from "./landing/landing_page.jsx";
import Login from "./landing/login";
import Home from "./Main/Home.jsx";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [id, setID] = useLocalStorage("id");
  console.log(id == true);
  return (
    <>
      <BrowserRouter>
        <header style={{ backgroundColor: "teal" }}>
          <h1>Chat App</h1>
          <button
            style={{
              padding: "6px 10px",
              color: "white",
              backgroundColor: "transparent",
            }}
            onClick={() => {
              localStorage.clear();
            }}
          >
            <a href="/"> LogOut</a>
          </button>
          <br />
          <NavLink to="/login/home">Home</NavLink>
          <p>{id ? id + "  " + true : false}</p>
        </header>
        {id ? (
          <Home id={id} />
        ) : (
          <Routes>
            <Route path="/sign_up" element={<Register setID={setID} />}></Route>
            <Route path="/login" element={<Login setID={setID} />}>
              <Route path="*" element={<Home id={id} />}></Route>
            </Route>
            <Route path="*" element={<Register setID={setID} />}></Route>
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
