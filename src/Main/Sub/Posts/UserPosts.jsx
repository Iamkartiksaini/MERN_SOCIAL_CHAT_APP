import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { postRequest } from "../../../Request/Post_Request";
import { user } from "../../../Request/User_Request";

function UserPosts() {
  let current_user = secureLocalStorage.getItem("chatApp-Switch-User");
  const [posts, updatePosts] = useState("null");

  useEffect(() => {
    user()
      .auth(current_user)
      .then((res) => {
        if (res.status == 200) {
          const getPvtPosts = postRequest().userPostsOnly(res.data[0].posts);
          getPvtPosts
            .then((res) => {
              return res.status === 200
                ? updatePosts(res.data)
                : console.log("Cant able to get user posts");
            })
            .catch((error) => {
              console.log("error in getting posts", error);
            });
        }
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, []);

  return (
    <>
      {" "}
      {posts == "null" ||
      typeof posts[0] != "object" ||
      current_user == null ? (
        <h1> {current_user !== null ? "Posts : 0" : "Choose a user"} </h1>
      ) : (
        posts.map((value, index) => {
          const { username, userID, _id, createdAt, profileImage } = value;
          const date = new Date(Date.parse(createdAt));
          const year = date.getFullYear();
          const month = date.getMonth() + 1; // months are zero-indexed
          const day = date.getDate();
          const hour = date.getHours();
          const minute = date.getMinutes();
          const second = date.getSeconds();
          return (
            <div
              className="tweet"
              key={index}
              style={{ backgroundColor: "#464646", width: "80%" }}
            >
              <div className="tweet-header">
                <div
                  style={{
                    backgroundImage: `url(${
                      profileImage == ""
                        ? "https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                        : profileImage
                    })`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height: "50px",
                    width: "50px",
                    borderRadius: "50%",
                  }}
                  className="tweet-avatar"
                />

                <div className="tweet-header-info">
                  <h1 className="tweet-name">{username}</h1>
                  <h2 className="tweet-username">@{userID}</h2>
                  <p className="tweet-date">
                    Time : {hour} - {minute} - {second}s <br /> Date :{day} -{" "}
                    {month} - {year}
                  </p>
                </div>
                {current_user.userID == userID ? (
                  <button
                    onClick={() => {
                      console.log("Post id", _id);
                      // sendOptions = "edit";
                      // editPostID = _id;
                      // text.current.value = value.text;
                    }}
                    className="Edit_Button"
                  >
                    Edit
                  </button>
                ) : null}

                {current_user.userID == userID ? (
                  <button
                    onClick={() => {
                      // deleteReq(_id);
                    }}
                    className="Dlt_Button"
                  >
                    Delete
                  </button>
                ) : null}
              </div>
              <p className="tweet-text">{value.text}</p>
              <div className="tweet-image">
                <img
                  height="170px"
                  width="170px"
                  src="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                  alt="Food"
                />
              </div>
              <div className="tweet-stats">
                <ul className="tweet-stats-list">
                  <li className="tweet-stats-item">
                    <a href="#" className="tweet-stats-link">
                      <i className="fas fa-comment">Comment</i>
                      <span className="tweet-stats-count">12</span>
                    </a>
                  </li>
                  <li className="tweet-stats-item">
                    <a href="#" className="tweet-stats-link">
                      <i className="fas fa-retweet">Retweet</i>
                      <span className="tweet-stats-count">34</span>
                    </a>
                  </li>
                  <li className="tweet-stats-item">
                    <a href="#" className="tweet-stats-link">
                      <i className="fas fa-heart">Likes</i>
                      <span className="tweet-stats-count">56</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

export default UserPosts;
