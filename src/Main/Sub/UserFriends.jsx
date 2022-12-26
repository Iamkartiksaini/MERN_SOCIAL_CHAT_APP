import axios from "axios";
import React, { useState, useEffect } from "react";
import Friend from "./Friend";

function UserFriends({ activeUser }) {
  const [getMsgFrom, update_getMsgFrom] = useState("messages");
  // const userVerify =JSON.parse(localStorage.getItem("chatapp-user"))
  if (activeUser.friends[0].roomID != getMsgFrom[0]._id) {
    console.log("change user", activeUser);
    show_this_friend_message(activeUser.friends[0].roomID);
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
  return (
    <div>
      UserFriends
      <br />
      {activeUser.friends.length != 0 ? (
        activeUser.friends.map((value, index) => {
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
      {getMsgFrom != "messages" ? (
        <Friend getMsgFrom={getMsgFrom} current_user={activeUser} />
      ) : null}
    </div>
  );
}

export default UserFriends;
