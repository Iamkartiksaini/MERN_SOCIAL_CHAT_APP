import axios from "axios";

export function postRequest() {
  return {
    makePost: function (current_user, text) {
      if (text.current.value !== "") {
        const { username, userID } = current_user;
        return axios
          .post("http://localhost:4000/posts", {
            username,
            userID,
            text: text.current.value,
          })
          .then((response) => {
            return response.status === 201
              ? response.data
              : console.log("Create Posts Failed");
          })
          .catch((error) => {
            return error;
          });
      }
    },
    editPost: function (id, text) {
      return axios
        .patch("http://localhost:4000/posts/123", {
          id,
          text: text.current.value,
        })
        .then((response) => {
          return response.status === 201
            ? response.data
            : console.log("Create Posts Failed");
        })
        .catch((error) => {
          return error;
        });
    },
    deletePost: function (id) {
      console.log("delete id", id);
      return axios
        .post("http://localhost:4000/posts/delete", { id })
        .then((response) => {
          return response.status === 200
            ? response.data
            : console.log("Create Posts Failed");
        })
        .catch((error) => {
          return error;
        });
    },
  };
}
