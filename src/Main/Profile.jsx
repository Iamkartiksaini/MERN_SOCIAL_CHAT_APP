import React from "react";
import "./Profile.css";
import secureLocalStorage from "react-secure-storage";
import UserPosts from "./Sub/Posts/UserPosts";

function Profile({ id }) {
  const x = secureLocalStorage.getItem("chatApp-Switch-User");
  const { username, userID, bio, friends, password, profileImage, coverImage } =
    x;
  console.log("user", x);
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <div
            style={{
              backgroundImage: `url(${
                profileImage == ""
                  ? "https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                  : profileImage
              })`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "100%",
              width: "100%",
              borderRadius: "50%",
            }}
            className="tweet-avatar"
          />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{username}</h1>
          <h2 className="profile-username">@{userID}</h2>

          <p className="profile-bio">
            {" "}
            Bio <br />
            {bio == "" ? "new user" : bio}
          </p>
          <ul className="profile-stats">
            <li>
              <span className="profile-stat-count">{x.posts.length}</span>{" "}
              Tweets
            </li>
            <li>
              <span className="profile-stat-count">{friends.length}</span>{" "}
              Following
            </li>
            <li>
              <span className="profile-stat-count">{friends.length}</span>{" "}
              Followers
            </li>
          </ul>
        </div>
      </div>
      <div className="profile-tabs">
        <ul className="profile-tabs-list">
          <li className="profile-tabs-item">
            <a href="#" className="profile-tabs-link active">
              Tweets
            </a>
          </li>
          <li className="profile-tabs-item">
            <a href="#" className="profile-tabs-link">
              Tweets & replies
            </a>
          </li>
          <li className="profile-tabs-item">
            <a href="#" className="profile-tabs-link">
              Media
            </a>
          </li>
          <li className="profile-tabs-item">
            <a href="#" className="profile-tabs-link">
              Likes
            </a>
          </li>
        </ul>
      </div>
      <div
        className="tweets"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
        }}
      >
        <UserPosts />
      </div>
    </div>
  );
}

export default Profile;
