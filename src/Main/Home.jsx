import React from "react";
import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Home({ id }) {
  const [all_Users, get_all_Users] = useState("all_Users");
  const [current_user, switch_user] = useState("no_User");

  useEffect(() => {
    get_updateof_AllUsers();
  }, []);

  function get_updateof_AllUsers() {
    return axios
      .get("http://localhost:4000")
      .then((response) => {
        console.log("getAllUsers", response.data);
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
        console.log("response User", response);
        if (response.status !== 404) {
          switch_user(response.data[0]);
          localStorage.setItem(
            "chatApp-CurrentUser",
            JSON.stringify(response.data[0])
          );
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
  // Get LocalStorage
  const getCurrentUser = JSON.parse(
    localStorage.getItem("chatApp-CurrentUser")
  );

  let friendList = [];
  if (current_user != "no_User" && current_user.friends.length != 0) {
    current_user.friends.map((value) => {
      friendList.push(value.username);
    });
  }
  return (
    <>
      <div className="home">
        <div>
          All users <br />
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
                        value.username === current_user.username ||
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
      </div>
    </>
  );
}
export default Home;
