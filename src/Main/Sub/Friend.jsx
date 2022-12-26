import axios from "axios";
import React, { useState, useRef } from "react";

function Friend({ getMsgFrom, current_user }) {
  const text = useRef();
  let x;
  if (getMsgFrom != "messages") {
    x = getMsgFrom;
  }
  const [messages, refresh_messages] = useState(x);

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
        refresh_messages(response.data);
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  return (
    <div>
      <button
        onClick={() => {
          console.log("refresh");
          show_this_friend_message(getMsgFrom[0]._id);
        }}
      >
        Refresh
      </button>
      {messages !== "messages" ? (
        messages[0].msg.length === 0 ? (
          <>
            <p>Info : No Message Yet </p>
            <p>Bot : Say,hi! </p>
          </>
        ) : (
          messages[0].msg.map((value, index) => {
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
      )}
      <form onClick={(e) => e.preventDefault()}>
        <input type="text" ref={text} placeholder="text" />
        <button id="sendTextButton" onClick={() => sendMessage()}>
          send
        </button>
      </form>
    </div>
  );
}

export default Friend;
