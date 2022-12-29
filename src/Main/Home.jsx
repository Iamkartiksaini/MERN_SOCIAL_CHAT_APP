import React from "react";
import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

function Home({ id }) {
  const [all_Users, get_all_Users] = useState("all_Users");
  const [current_user, switch_user] = useState("no_User");
  // Get LocalStorage
  const x = secureLocalStorage.getItem("chatApp-Switch-User");

  useEffect(() => {
    get_updateof_AllUsers();
    if (current_user != "no_User" || x != null) {
      switch_user(x);
    }
  }, []);

  function get_updateof_AllUsers() {
    return axios
      .get("http://localhost:4000")
      .then((response) => {
        get_all_Users(response.data);
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
  function switch_to_This_User(value) {
    const x = {
      userID: value.userID,
      password: value.password,
    };
    axios
      .post("http://localhost:4000", x)
      .then((response) => {
        if (response.status !== 404) {
          const { username, userID, friends } = response.data[0];
          const x = {
            username,
            userID,
            friends,
          };
          switch_user(x);
          secureLocalStorage.setItem("chatApp-Switch-User", x);
          get_updateof_AllUsers();
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  // ---- Add friend ----
  function createRoom(value) {
    axios
      .post("http://localhost:4000/conversation/create", {
        members: [
          { name: value.username, userID: value.userID },
          { name: current_user.username, userID: current_user.userID },
        ],
        msg: [],
      })
      .then((response) => {
        function okk() {
          axios
            .patch("http://localhost:4000/addFriend", {
              roomID: response.data._id,
              friend: {
                username: value.username,
                userID: value.username,
              },
              user: {
                username: current_user.username,
                userID: current_user.username,
              },
            })
            .then((response) => {
              console.log(" AddfriendsResponse", response.data);
              const value = {
                userID: current_user.userID,
                password: current_user.password,
              };
              switch_to_This_User(value);
            })
            .catch((error) => {
              return error;
            });
        }
        return okk();
      })
      .catch((error) => {
        return error;
      });
  }

  function addFriend(value) {
    createRoom(value);
    // ---- Adding Friend To the User and his/her Friend List ----
  }

  // Set LocalStorage
  if (all_Users != "all_Users") {
    if (current_user == "no_User") {
      localStorage.setItem("chatApp-CurrentUser", JSON.stringify(all_Users[0]));
      switch_user(all_Users[0]);
    }
  }

  let friendList = [];
  if (current_user != "no_User" && current_user.friends.length != 0) {
    current_user.friends.map((value) => {
      friendList.push(value.username);
    });
  }
  return (
    <>
      <div className="home">
        <h1 style={{ color: "white", padding: "5px 0px" }}> All users </h1>{" "}
        <br />
        {all_Users !== "all_Users"
          ? all_Users.map((value, index) => {
              if (value.username !== undefined) {
                return (
                  <div className="Friend" key={index}>
                    <button
                      onClick={() => {
                        switch_to_This_User(value);
                      }}
                      className={
                        value.username === current_user.username
                          ? "activeUser"
                          : null
                      }
                    >
                      {value.username}
                    </button>
                    {current_user !== "no_User" ? (
                      friendList.includes(value.username) ? null : (
                        <p
                          className="addTofriend"
                          onClick={() => {
                            addFriend(value);
                          }}
                        >
                          + Friend
                        </p>
                      )
                    ) : null}
                  </div>
                );
              }
            })
          : null}
      </div>
    </>
  );
}
export default Home;
