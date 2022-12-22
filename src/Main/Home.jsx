import React from "react";
import "./home.css";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { get, trusted } from "mongoose";

function Home({ id }) {
  const text = useRef();
  // const [res, setres] = useState([``]);
  const [users, setUsers] = useState([``]);
  const [showChat, setChat] = useState({
    username: "Click_on",
    userID: "All users",
    friends: [
      { username: " List names to ", userID: "fetch this", roomID: "1234" },
    ],
  });
  const [modelopt, setmodel] = useState(true);
  const [getMsgFrom, update_getMsgFrom] = useState([
    { msg: [{ sender: "Dummy", text: "null" }] },
  ]);

  useEffect(() => {
    // getAllConversation();
    getAllUsers();
  }, []);

  function getAllUsers() {
    return axios
      .get("http://localhost:4000")
      .then((response) => {
        console.log("All Users", response.data);
        setUsers(response.data);
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

  function getThisUser(value) {
    const { _id, username, userID } = value;
    console.log("value on click", value);
    setChat(value);
    setmodel(true);
  }

  function getThisFriend(value) {
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
            sender: showChat.username,
            text: text.current.value,
          },
        })
        .then((response) => {
          response.status === 201
            ? getThisFriend(getMsgFrom[0]._id)
            : console.log(" getMsgFrom[0]._id ", getMsgFrom[0]._id);
          console.log(" GET ROOM Data ", response.data);
        })
        .catch((error) => {
          return error;
        });
    }
  }

  return (
    <>
      <div className="home">
        <div>
          All users : <br />
          {users.map((value, index) => {
            if (value.username !== undefined) {
              return (
                <button
                  key={index}
                  onClick={() => {
                    getThisUser(value);
                  }}
                >
                  {value.username}
                </button>
              );
            }
          })}
        </div>
        <div>
          Messsages
          <br />
          {/* <button onClick={getAllConversation}>Get Msg data</button> */}
          <button onClick={getAllUsers}>All users data</button>
          {/* {res[0].members !== undefined
            ? res.map((value, index) => {
                return (
                  <div key={index} className="box">
                    {value.members.map((val, ind) => {
                      return (
                        <p key={ind} className="member">
                          no{index} member name : {val.name}
                          <br /> ID : {val.Id}{" "}
                        </p>
                      );
                    })}
                    {value.msg.map((val, ind) => {
                      return (
                        <p key={ind} className="msg">
                          No . {ind} {"  "}
                          <span className="sender">
                            sender {val.sender}{" "}
                          </span>{" "}
                          <br />
                          <span className="text"> msg : {val.text}</span>
                        </p>
                      );
                    })}
                  </div>
                );
              })
            : null} */}
          <form onClick={(e) => e.preventDefault()}>
            <input type="text" ref={text} placeholder="text" />
            <button onClick={() => sendMessage()}>send</button>
          </form>
        </div>
        <div>
          {" "}
          Current User Data : <br />
          {modelopt == true ? (
            <span>
              <p> username : {showChat.username}</p>
              <p>user_id: {showChat.userID}</p>
              <p>Friends : </p>
              {showChat.friends.length !== 0
                ? showChat.friends.map((value, index) => {
                    const { username, userID, roomID } = value;
                    return (
                      <button key={index} onClick={() => getThisFriend(roomID)}>
                        {" "}
                        {username} & {userID}
                      </button>
                    );
                  })
                : null}
              {getMsgFrom[0].msg.map((value, index) => {
                return (
                  <p key={index}>
                    {value.sender} : {value.text}
                  </p>
                );
              })}
              <p
                onClick={() => {
                  setmodel(false);
                }}
              >
                close
              </p>
            </span>
          ) : (
            <p>Not data to show</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
