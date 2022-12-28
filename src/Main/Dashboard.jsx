import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Messages from "./Message";
import Profile from "./Profile";

function Dashboard({ id }) {
  return (
    <>
      <p>Dashborad is active</p>
      <Routes path="/Dashboard">
        <Route path="profile" element={<Profile />}></Route>
        <Route path="home" element={<Home />}></Route>
        <Route path="message" element={<Messages />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default Dashboard;
