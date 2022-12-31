import axios from "axios";
import React, { useState, useRef } from "react";
import "./Friend.css";
import secureLocalStorage from "react-secure-storage";

function Friend({
  getMsgFrom,
  current_user,
  current_user_friend,
  update_getMsgFrom,
}) {
  const text = useRef();
  const [msg, updateMsg] = useState(getMsgFrom);

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

  function show_this_friend_message(value) {
    return axios
      .post("http://localhost:4000/conversation/x/y", {
        id: value,
      })
      .then((response) => {
        console.log(" GET ROOM Data", response.data);
        secureLocalStorage.setItem(
          "chatApp-Coversation_b/w_user-this_friend",
          response.data[0]
        );
        updateMsg(response.data);
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
  console.log("current_user_friend", current_user_friend);

  return (
    <div>
      <p style={{ color: "white" }}>
        {current_user_friend && current_user_friend.username}
      </p>
      {msg !== "messages" ? (
        <div className="modal">
          <div className="modal-head">
            <div className="modal-avatar"> </div>
            <br />

            <div className="friend-info">
              <span className="friend-name">
                {current_user_friend && current_user_friend.username}
              </span>
              <span
                className="friend-userID"
                style={{ color: " #a1a1a1", margin: "4px" }}
              >
                @{current_user_friend && current_user_friend.userID}
              </span>
              <br />
            </div>
            <button
              onClick={() => {
                update_getMsgFrom("messages");
              }}
            >
              close
            </button>
          </div>
          <div className="modal-body">
            <div className="modal-messages">
              <ul>
                {msg[0].msg.length === 0 ? (
                  <>
                    <li style={{ color: "white" }}>Info : No Message Yet</li>
                    <li>Bot : Say,hi! </li>{" "}
                  </>
                ) : (
                  msg[0].msg.map((value, index) => {
                    return (
                      <li
                        key={index}
                        style={{
                          flexDirection:
                            value.sender === current_user.username
                              ? "row-reverse"
                              : "row",
                        }}
                      >
                        {value.text}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
            <form onClick={(e) => e.preventDefault()}>
              <input type="text" ref={text} placeholder="text" />
              <button id="sendTextButton" onClick={() => sendMessage()}>
                send
              </button>
            </form>{" "}
          </div>
        </div>
      ) : (
        <p>non</p>
      )}
    </div>
  );
}

export default Friend;
// modal > modal-content > head , body
// head > img , friend-info > name ,id
// body > friend-msg , form
// body > friend-msg if msg length is 0 no msg yet
// else show msg
