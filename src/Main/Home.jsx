import React from "react";
import "./home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import UserFriends from "./Sub/UserFriends";

function Home({ id }) {
  const [all_Users, get_all_Users] = useState("all_Users");
  const [current_user, switch_user] = useState("no_User");

  useEffect(() => {
    get_updateof_AllUsers();
  }, []);

  useEffect(() => {
    if (all_Users !== "all_Users") {
      all_Users.map((val) => {
        return val.username == current_user.username ? switch_user(val) : null;
      });
    }
  }, [all_Users]);

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
    // const { _id, username, userID } = value;
    console.log("value on click", value);
    switch_user(value);
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
              get_updateof_AllUsers("room");
            })
            .catch((error) => {
              return error;
            });
        }
        okk();
      })
      .catch((error) => {
        return error;
      });
  }

  function addFriend(value) {
    createRoom(value);
    // ---- Adding Friend To the User and his/her Friend List ----
  }
  let friendList = [];
  if (current_user != "no_User") {
    current_user.friends.map((val, ind) => {
      friendList.push(val.username);
    });
  }

  return (
    <>
      <div className="home">
        <div>
          All users
          <br />{" "}
          <button onClick={get_updateof_AllUsers}>
            Refresh All Users
          </button>{" "}
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
                            ? "active"
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
        <div>
          {current_user !== "no_User" ? (
            <UserFriends activeUser={current_user} />
          ) : null}
        </div>
        <div>
          Current User Data : <br />
          <span>
            <p> username : {current_user.username}</p>
            <p>user_id: {current_user.userID}</p>
          </span>
        </div>
      </div>
    </>
  );
}
export default Home;
