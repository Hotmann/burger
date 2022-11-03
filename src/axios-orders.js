import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-burger-ra-default-rtdb.firebaseio.com/",
});

export default instance;
