import axios from "axios";

//Base URL
const Axios = axios.create({
  baseURL: "http://localhost:5001/",
});

//Interceptor for token
Axios.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (!req.headers.Authorization && token) {
    req.headers.Authorization = token;
    return req;
  }
  return req;
});

export default Axios;