/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constant";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/userSlice.js";
import { useRegisterMutation } from "../slices/userApiSlices.js";
import { useNavigate } from "react-router-dom";

const Register = ({ visible, onClose, onFormSwitch }) => {
  if (!visible) return null;
  const handleOnClose = (e) => {
    if (e.target.id === "container") {
      onClose();
      visible == null;
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register] = useRegisterMutation();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      onFormSwitch("login");
      toast.success("Register Successful");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleGoogleAuth = () => {
    try {
      window.location.href = `${BACKEND_URL}/auth/google/callback`;
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div
        id="container"
        onClick={handleOnClose}
        className="flex justify-center items-center align-middle h-full fixed overflow-auto inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10"
      >
        <form
          onSubmit={handleRegister}
          className="max-w-[400px] w-full mx-auto mt-11 bg-white p-8 max-[600px]:w-[340px] max-[400px]:w-[300px]"
        >
          <h2 className="text-[33px] font-bold text-center">Register</h2>
          <div className="flex justify-between "></div>
          <div className="flex flex-col mb-2">
            <label>Username</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-2">
            <label>Email</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col ">
            <label>Password</label>
            <input
              className="border relative bg-gray-100 p-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white"
          >
            Sign Up
          </button>
          <p className="flex items-center mt-2">
            <input className="mr-2" type="checkbox" />
            Remember Me
          </p>
          <p className="text-center mt-8">
            Already a Memeber?{" "}
            <span
              className="cursor-pointer"
              onClick={() => onFormSwitch("login")}
            >
              Login now
            </span>{" "}
          </p>
          <button
            type="button"
            className="flex mt-[7px] ml-[16px] md:ml-[68px] items-center  bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium  text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={handleGoogleAuth}
          >
            <svg
              className="h-6 w-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="800px"
              height="800px"
              viewBox="-0.5 0 48 48"
              version="1.1"
            >
              {" "}
              <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
              <defs> </defs>{" "}
              <g
                id="Icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                {" "}
                <g id="Color-" transform="translate(-401.000000, -860.000000)">
                  {" "}
                  <g id="Google" transform="translate(401.000000, 860.000000)">
                    {" "}
                    <path
                      d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                      id="Fill-1"
                      fill="#FBBC05"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                      id="Fill-2"
                      fill="#EB4335"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                      id="Fill-3"
                      fill="#34A853"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                      id="Fill-4"
                      fill="#4285F4"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </svg>
            Sign Up with Google
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
