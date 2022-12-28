import React from "react";
import "./Profile.css";

function Profile({ id }) {
  const x = JSON.parse(localStorage.getItem("chatApp-CurrentUser"));
  const { username, userID, password } = x;
  return (
    <div class="profile">
      <div class="profile-header">
        <div class="profile-avatar">
          <img
            src="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="Avatar"
          />
        </div>
        <div class="profile-info">
          <h1 class="profile-name">{username}</h1>
          <h2 class="profile-username">@{userID}</h2>
          <p class="profile-bio">Software engineer and avid Twitter user</p>
          <ul class="profile-stats">
            <li>
              <span class="profile-stat-count">1234</span> Tweets
            </li>
            <li>
              <span class="profile-stat-count">5678</span> Following
            </li>
            <li>
              <span class="profile-stat-count">9101</span> Followers
            </li>
          </ul>
        </div>
      </div>
      <div class="profile-tabs">
        <ul class="profile-tabs-list">
          <li class="profile-tabs-item">
            <a href="#" class="profile-tabs-link active">
              Tweets
            </a>
          </li>
          <li class="profile-tabs-item">
            <a href="#" class="profile-tabs-link">
              Tweets & replies
            </a>
          </li>
          <li class="profile-tabs-item">
            <a href="#" class="profile-tabs-link">
              Media
            </a>
          </li>
          <li class="profile-tabs-item">
            <a href="#" class="profile-tabs-link">
              Likes
            </a>
          </li>
        </ul>
      </div>

      <div class="tweet">
        <div class="tweet-header">
          <img
            src="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="Avatar"
            class="tweet-avatar"
          />
          <div class="tweet-header-info">
            <h1 class="tweet-name">John Doe</h1>
            <h2 class="tweet-username">@johndoe</h2>
            <p class="tweet-date">1h</p>
          </div>
        </div>
        <p class="tweet-text">
          Just discovered this amazing new restaurant in the city! The food is
          out of this world. Highly recommend checking it out if you're in the
          area. #foodie #yum
        </p>
        <div class="tweet-image">
          <img
            height="220px"
            width="220px"
            src="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
            alt="Food"
          />
        </div>
        <div class="tweet-stats">
          <ul class="tweet-stats-list">
            <li class="tweet-stats-item">
              <a href="#" class="tweet-stats-link">
                <i class="fas fa-comment"> comment</i>
                <span class="tweet-stats-count">12</span>
              </a>
            </li>
            <li class="tweet-stats-item">
              <a href="#" class="tweet-stats-link">
                <i class="fas fa-retweet">Retweet</i>
                <span class="tweet-stats-count">34</span>
              </a>
            </li>
            <li class="tweet-stats-item">
              <a href="#" class="tweet-stats-link">
                <i class="fas fa-heart">Likes</i>
                <span class="tweet-stats-count">56</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
