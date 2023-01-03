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
    patchPost: function (current_user, postID) {
      axios
        .patch("http://localhost:4000/updateUserPosts", {
          postID,
          userID: current_user.userID,
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });
    },
    auth: function (current_user) {
      const { userID, password } = current_user;
      return axios.post("http://localhost:4000", { userID, password });
    },
  };
}
