import axios from "axios";

export function user() {
  return {
    get_updateof_AllUsers: function () {
      return axios
        .get("http://localhost:4000")
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });
    },
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
  };
}
