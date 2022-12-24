import React from "react";
import "./home.css";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

function Home({ id }) {
  const text = useRef();
  const [all_Users, get_all_Users] = useState("all_Users");
  const [current_user, switch_user] = useState("no_User");
  const [getMsgFrom, update_getMsgFrom] = useState("messages");

  useEffect(() => {
    // getAllConversation();
    getAllUsers();
  }, []);

  function getAllUsers() {
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

  // function getAllConversation() {
  //   return axios
  //     .get("http://localhost:4000/conversation")
  //     .then((response) => {
  //       console.log("response.data", response.data);
  //       setres(response.data);
  //       return response.data;
  //     })
  //     .catch((error) => {
  //       return error;
  //     });
  // }

  function switch_to_This_User(value) {
    const { _id, username, userID } = value;
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
              getAllUsers();
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
                        value.username === current_user.username ? null : (
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
          <button onClick={getAllUsers}>All users data</button>
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
          {current_user !== "no_User" ? (
            getMsgFrom !== "messages" ? (
              getMsgFrom[0].msg.length === 0 ? (
                <>
                  <p>Bot : No Message </p>
                  <p>Bot : Say,hi! </p>
                </>
              ) : (
                getMsgFrom[0].msg.map((value, index) => {
                  return (
                    <p key={index}>
                      {value.sender} : {value.text}
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
