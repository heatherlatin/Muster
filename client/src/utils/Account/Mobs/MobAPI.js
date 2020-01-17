import axios from "axios";

export default {
  // Adds a new user to the current user's mobs
  addMob: function () {
    return axios.post("/api/mobs").then(({ data }) => data);
  },
  // Gets current user's mobs from the db
  getMobs: function () {
    return axios.get("/api/mobs").then(({ data }) => data);
  },
};