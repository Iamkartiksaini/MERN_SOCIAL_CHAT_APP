import React from "react";
import "./Profile.css";
import secureLocalStorage from "react-secure-storage";

function Profile({ id }) {
  const x = secureLocalStorage.getItem("chatApp-Switch-User");

  const { username, userID, password } = x;
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <img
            src="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="Avatar"
          />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{username}</h1>
          <h2 className="profile-username">@{userID}</h2>
          <p className="profile-bio">Software engineer and avid Twitter user</p>
          <ul className="profile-stats">
            <li>
              <span className="profile-stat-count">1234</span> Tweets
            </li>
            <li>
              <span className="profile-stat-count">5678</span> Following
            </li>
            <li>
              <span className="profile-stat-count">9101</span> Followers
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
          padding: "20px",
        }}
      >
        <div className="tweet">
          <div className="tweet-header">
            <img
              src="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
              alt="Avatar"
              className="tweet-avatar"
            />
            <div className="tweet-header-info">
              <h1 className="tweet-name">John Doe</h1>
              <h2 className="tweet-username">@johndoe</h2>
              <p className="tweet-date">1h</p>
            </div>
          </div>
          <p className="tweet-text">
            Just discovered this amazing new restaurant in the city! The food is
            out of this world. Highly recommend checking it out if you're in the
            area. #foodie #yum
          </p>
          <div className="tweet-image">
            <img
              height="220px"
              width="220px"
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
      </div>
    </div>
  );
}

export default Profile;
