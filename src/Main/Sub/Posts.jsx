import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../Profile.css";
import secureLocalStorage from "react-secure-storage";

function Posts() {
  const text = useRef();
  const [posts, updatePosts] = useState("null");
  const current_user = secureLocalStorage.getItem("chatApp-Switch-User");

  useEffect(() => {
    getAllPosts();
  }, []);

  function getAllPosts() {
    return axios
      .get("http://localhost:4000/posts")
      .then((response) => {
        console.log("all_Posts", response.data);
        updatePosts(response.data);
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  }

  function makePost() {
    console.log("text", text.current.value);
    if (text.current.value !== "") {
      const { username, userID } = current_user;
      return axios
        .post("http://localhost:4000/posts", {
          username,
          userID,
          text: text.current.value,
        })
        .then((response) => {
          response.status === 201 ? getAllPosts() : console.log("Create Posts");
          text.current.value = "";
        })
        .catch((error) => {
          return error;
        });
    }
  }

  return (
    <>
      <h1 style={{ borderLeft: "5px solid white", paddingLeft: "4px " }}>
        Posts
      </h1>
      <form onClick={(e) => e.preventDefault()}>
        <input type="text" ref={text} placeholder="text" />
        <button id="sendTextButton" onClick={() => makePost()}>
          send
        </button>
      </form>{" "}
      <div
        className="tweets"
        style={{
          width: " 100%",
          padding: "20px",
          display: " flex",
          flexDirection: " column-reverse",
        }}
      >
        {" "}
        {posts == "null"
          ? null
          : posts.map((value, index) => {
              const { username, userID, text, _id } = value;
              return (
                <div
                  className="tweet"
                  key={index}
                  style={{ backgroundColor: "#464646" }}
                  onClick={() => {
                    console.log("tweet id ", _id);
                  }}
                >
                  <div className="tweet-header">
                    <img
                      src="https://images.unsplash.com/photo-1661956602139-ec64991b8b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
                      alt="Avatar"
                      className="tweet-avatar"
                    />
                    <div className="tweet-header-info">
                      <h1 className="tweet-name">{username}</h1>
                      <h2 className="tweet-username">@{userID}</h2>
                      <p className="tweet-date">1h</p>
                    </div>
                  </div>
                  <p className="tweet-text">{text}</p>
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
            })}{" "}
      </div>
    </>
  );
}

export default Posts;
