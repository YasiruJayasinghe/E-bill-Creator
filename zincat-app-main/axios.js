import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.10.30.234:8081",
});

export default instance;
