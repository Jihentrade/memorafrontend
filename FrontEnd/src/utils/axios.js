import axios from "axios";
import { BASE_URL } from "../constants/api";
import { store } from "../redux/store";
// import { refreshToken } from "redux/authSlice";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosPrivate.interceptors.request.use(
  async (req) => {
    const accessToken = store?.getState()?.auth?.tokens;
    // console.log(accessToken)
    // let currentDate = new Date();
    if (accessToken) {
      // const decodedToken = jwt_decode(accessToken)
      // if (decodedToken.exp * 1000 < currentDate.getTime()) {
      //   // await store.dispatch(refreshToken());
      //   if (req?.headers) {
      //     req.headers['Authorization'] = `Bearer ${accessToken}`
      //   }
      // } else {
      //   req.headers['Authorization'] = `Bearer ${accessToken}`
      // }
      req.headers["Authorization"] = `${accessToken}`;
    }
    return req;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
