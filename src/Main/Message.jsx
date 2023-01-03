import React, { useState } from "react";
import Friend from "./Sub/Friend";
import axios from "axios";
import "./Sub/Friend.css";
import secureLocalStorage from "react-secure-storage";

const dummy =
  "https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

function Messages() {
  const [getMsgFrom, update_getMsgFrom] = useState("messages");
  const current_user = secureLocalStorage.getItem("chatApp-Switch-User");

  function show_this_friend_message(value) {
    return axios
      .post("http://localhost:4000/conversation/x/y", {
        id: value,
      })
      .then((response) => {
        update_getMsgFrom(response.data);
        secureLocalStorage.setItem(
          "chatApp-Coversation_b/w_user-this_friend",
          response.data[0]
        );
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
  const current_user_friend = secureLocalStorage.getItem(
    "ChatApp-user_getThisFriend-conversation"
  );

  return (
    <div className="Message">
      {getMsgFrom == "messages" ? null : (
        <Friend
          current_user_friend={current_user_friend}
          getMsgFrom={getMsgFrom}
          current_user={current_user}
          update_getMsgFrom={update_getMsgFrom}
        />
      )}
      <div className="friends">
        <ul className="friends-list">
          {current_user.friends.length == 0 ? (
            <p>No friends</p>
          ) : (
            current_user.friends.map((value, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    show_this_friend_message(value.roomID);
                    secureLocalStorage.setItem(
                      "ChatApp-user_getThisFriend-conversation",
                      value
                    );
                    // toggleModal();
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "row ",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <img
                    src={dummy}
                    className="modal-avatar"
                    height="50px"
                    width="50px"
                    alt="Avatar"
                  />
                  <div className="friend-info">
                    <span className="friend-name">{value.username}</span>
                    <span className="friend-username">@{value.userID}</span>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
export default Messages;
