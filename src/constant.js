/* eslint-disable no-unused-vars */
import Cookies from "js-cookie";

export const BACKEND_URL = "https://ticket-less-backend-7vfq.vercel.app";
export const USERS_URL = "/api/users";
export const BASE_URL = "https://ticket-less-backend-7vfq.vercel.app";

const getJwtToken = () => {
  return Cookies.get("jwt"); // Replace 'jwt_token' with the name of your cookie
};

// Example usage
// const jwtToken = getJwtToken();
