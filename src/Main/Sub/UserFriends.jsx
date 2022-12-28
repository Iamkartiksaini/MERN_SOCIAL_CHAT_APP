import axios from "axios";
import React, { useState } from "react";
import Friend from "./Friend";

function UserFriends({ activeUser }) {
  const [getMsgFrom, update_getMsgFrom] = useState("messages");
  let x = JSON.parse(localStorage.getItem("chatApp-user"));
  let y = JSON.parse(localStorage.getItem("chatApp-user-friend"));
  console.log("vs", activeUser.username, x.username);

  if (activeUser.username != x.username && activeUser != "no_User") {
    console.log("vs", activeUser.username, x.username);
  }
  localStorage.setItem("chatApp-getmsgfrom", JSON.stringify(getMsgFrom));
  if (getMsgFrom == "messages" && activeUser.friends.length != 0) {
    show_this_friend_message(activeUser.friends[0].roomID);
  }

  if (activeUser.username != x.username && activeUser.friends.length != 0) {
    show_this_friend_message(activeUser.friends[0].roomID);
    localStorage.setItem("chatApp-user", JSON.stringify(activeUser));
  }
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
  return (
    <div>
      UserFriends
      <br />
      {activeUser.friends.length != 0 ? (
        activeUser.friends.map((value, index) => {
          const { username, userID, roomID } = value;
          return (
            <button
              className={roomID === getMsgFrom[0]._id ? "activeUser" : null}
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
      {activeUser.friends.length == 0 ? null : getMsgFrom != "messages" ? (
        <Friend
          getMsgFrom={getMsgFrom}
          current_user={activeUser}
          update_getMsgFrom={update_getMsgFrom}
        />
      ) : null}
    </div>
  );
}

export default UserFriends;
//  when user switched --home
// active user
// set local store info of user
//  --User Friend
// 1: friend not exsits dont show anything
// But its Friends exsist
//  set 1st friend active
// get local store info of user compare if same than --- switch friend
