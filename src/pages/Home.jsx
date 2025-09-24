/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Scroller from "../components/Scroller.jsx";
import Bannerhome from "../components/Bannerhome.jsx";
import Cards from "../components/Cards.jsx";
import Footer from "../components/Footer.jsx";
import Unlease from "../components/Unlease.jsx";
import UnleaseMuseum from "../components/UnleaseMuseum.jsx";
import { useDispatch, useSelector } from "react-redux";
import { BACKEND_URL } from "../constant.js";
import { setCredentials } from "../slices/userSlice.js";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/auth/login/success`, {
        withCredentials: true,
      });

      dispatch(
        setCredentials({
          ...res.data.user._doc,
          _id: res.data.id,
        })
      );
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Navbar />
      <Bannerhome />
      <div className="md:mx-[1rem] mx-[1rem] my-2">
        <Scroller />
      </div>
      <main className="container py-3 mx-auto flex-grow">
        <Outlet />
        <ToastContainer />
      </main>
      <Unlease />
      <UnleaseMuseum />
      <Cards />
      <Footer />
    </>
  );
};

export default Home;
