import React from "react";
import "./home.css";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import WorldUsers from "./Sub/worldUsers";
import UserFriends from "./Sub/UserFriends";

function Home({ id }) {
  const text = useRef();
  const [all_Users, get_all_Users] = useState("all_Users");
  const [current_user, switch_user] = useState("no_User");
  const [getMsgFrom, update_getMsgFrom] = useState("messages");

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

  useEffect(() => {
    if (current_user !== "no_User") {
      current_user.friends.map((val) => {
        return val.username == current_user.username ? switch_user(val) : null;
      });
    }
    if (current_user !== "no_User" && current_user.friends.length != 0) {
      show_this_friend_message(current_user.friends[0].roomID);
    }
  }, [current_user]);

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

  function show_this_friend_message(value) {
    return axios
      .post("http://localhost:4000/conversation/x/y", {
        id: value,
      })
      .then((response) => {
        console.log(" GET ROOM Data", response.data);
        update_getMsgFrom(response.data);
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  function sendMessage() {
    if (text.current.value !== "") {
      return axios
        .patch("http://localhost:4000/conversation/x", {
          id: getMsgFrom[0]._id,
          msg: {
            sender: current_user.username,
            text: text.current.value,
          },
        })
        .then((response) => {
          response.status === 201
            ? show_this_friend_message(getMsgFrom[0]._id)
            : console.log(" getMsgFrom[0]._id ", getMsgFrom[0]._id);
          console.log(" GET ROOM Data ", response.data);
          text.current.value = "";
        })
        .catch((error) => {
          return error;
        });
    }
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
          All users : <br />
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
          Messages
          <br />
          <button onClick={get_updateof_AllUsers}>All users data</button>
          <br />
          {current_user !== "no_User" ? (
            current_user.friends.map((value, index) => {
              const { username, userID, roomID } = value;
              return (
                <button
                  className={roomID === getMsgFrom[0]._id ? "active" : null}
                  key={index}
                  onClick={() => show_this_friend_message(roomID)}
                >
                  {" "}
                  {username} & {userID}
                </button>
              );
            })
          ) : (
            <div className="lds-dual-ring">
              <p>Pull Data</p>
            </div>
          )}
          <br />
          <div className="msgCSS">
            {current_user !== "no_User" ? (
              getMsgFrom !== "messages" ? (
                getMsgFrom[0].msg.length === 0 ? (
                  <>
                    <p>Info : No Message Yet </p>
                    <p>Bot : Say,hi! </p>
                  </>
                ) : (
                  getMsgFrom[0].msg.map((value, index) => {
                    return (
                      <p
                        key={index}
                        className="getMsgFrom"
                        style={{
                          flexDirection:
                            value.sender === current_user.username
                              ? "row-reverse"
                              : "row",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor:
                              value.sender === current_user.username
                                ? "yellow"
                                : "#14dd73",
                            margin:
                              value.sender === current_user.username
                                ? "0px 0px 0px 8px"
                                : "0px 8px 0px 0px",
                          }}
                          className="senderName"
                        >
                          {value.sender}
                        </span>
                        {value.text}
                      </p>
                    );
                  })
                )
              ) : (
                <div className="lds-dual-ring">
                  <p>Pull Message Data </p>
                </div>
              )
            ) : null}
          </div>
          <form onClick={(e) => e.preventDefault()}>
            <input type="text" ref={text} placeholder="text" />
            <button id="sendTextButton" onClick={() => sendMessage()}>
              send
            </button>
          </form>
        </div>
        <div>
          {" "}
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
