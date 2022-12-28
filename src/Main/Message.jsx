import React, { useState } from "react";
import Friend from "./Sub/Friend";
import axios from "axios";
import "./Sub/Friend.css";

const dummy =
  "https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

function Messages() {
  // const [message, setMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [getMsgFrom, update_getMsgFrom] = useState("messages");
  const current_user = JSON.parse(localStorage.getItem("chatApp-CurrentUser"));

  // const handleMessageChange = (event) => {
  //   setMessage(event.target.value);
  // };

  // const handleMessageSubmit = (event) => {
  //   event.preventDefault();
  //   setMessage(""); // Clear the message input
  // };

  // const toggleModal = () => {
  //   setModalVisible(!modalVisible);
  // };

  function show_this_friend_message(value) {
    return axios
      .post("http://localhost:4000/conversation/x/y", {
        id: value,
      })
      .then((response) => {
        console.log(" GET ROOM Data", response.data);
        update_getMsgFrom(response.data);
        localStorage.setItem(
          "chatApp-user-friend",
          JSON.stringify(response.data[0])
        );
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }
  const current_user_friend = JSON.parse(
    localStorage.getItem("user-friend-conversation")
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
        <ul class="friends-list">
          {current_user.friends.length == 0 ? (
            <p>No friends</p>
          ) : (
            current_user.friends.map((value, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    show_this_friend_message(value.roomID);
                    localStorage.setItem(
                      "user-friend-conversation",
                      JSON.stringify(value)
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
      {/* Modal */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <img src="" alt="Avatar" />
            <div className="friend-info">
              <span className="friend-name">Jane Doe</span>
              <span className="friend-username">@jane_doe</span>
              <br />
              {/* <button onClick={toggleModal}>close</button> */}
            </div>
            <div className="friend-msg">
              <ul>
                <li>
                  <p>hii</p>
                </li>
              </ul>
            </div>
            {/* <form onSubmit={handleMessageSubmit}>
              <textarea
                value={message}
                onChange={handleMessageChange}
                placeholder="Write your message here"
              />
              <button type="submit">Send</button>
            </form> */}
          </div>
        </div>
      )}
    </div>
  );
}
export default Messages;