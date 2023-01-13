import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Messages from "./Message";
import Profile from "./Profile";
import { useSelector } from "react-redux";

function Dashboard({ id }) {
  const showAuth = useSelector((state) => state.userAuthReducer);
  console.log("show auth", showAuth);
  return (
    <>
      <p>Dashborad is active </p>
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
