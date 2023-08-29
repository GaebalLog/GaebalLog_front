import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_SERVER,
  withCredentials: true,
});
