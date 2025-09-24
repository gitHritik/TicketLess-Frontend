/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import TypeWriter from "./TypeWriter.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlices.js";
import { logout } from "../slices/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [Mobile, setMobile] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  // ${isScrolled ? 'bg-gray-800 text-white' : 'bg-transparent text-black'}
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCloseLogin = () => {
    setShowLogin(false);
    setCurrentForm("login");
  };
  const handleCloseRegister = () => {
    setShowRegister(false);
    setCurrentForm("login");
  };

  const toggleForm = (formName) => {
    setCurrentForm(formName);
    if (formName == "login") {
      setShowLogin(true);
      setShowRegister(false);
    }
    if (formName == "register") {
      setShowLogin(false);
      setShowRegister(true);
    }
  };
  const [logoutApi] = useLogoutMutation();

  const { userInfo } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/");

      toast.success("logged Out Successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <>
      <nav
        className={`bg-gray-800 p-4 max-md:p-7 fixed w-full top-0 z-10 transition duration-300 brightness-100 ${
          isScrolled
            ? "bg-transparent text-white hidden"
            : "bg-transparent text-white"
          // isScrolled ? "bg-gray-800 text-white" : "bg-transparent text-black"
        }`}
        data-aos="fade-up"
      >
        {/* <nav className=" bg-transparent p-4 max-md:p-7 fixed w-full top-0 z-10 transition duration-300 ease-in-out"> */}
        <div className="container mx-auto flex justify-between items-center ">
          <Link
            to="/"
            className=" text-white text-[2rem] font-bold max-md:hidden"
          >
            <TypeWriter text="TicketLess" delay={100} />
          </Link>
          <ul
            className={
              Mobile ? " max-md:hidden" : "flex flex-col justify-start w-full"
            }
          >
            <Link
              to="/"
              className="text-white mr-4 max-md:border-b border-gray-700 my-1 "
            >
              Home
            </Link>
            {userInfo ? (
              <Link
                to="/booking"
                className="text-white mr-4 max-md:border-b border-gray-700 my-1 "
              >
                Booking
              </Link>
            ) : null}

            <Link
              to="/about"
              className="text-white mr-4 max-md:border-b border-gray-700 my-1 "
            >
              About us
            </Link>
            <Link
              to="/contact"
              text-2xl
              className="text-white mr-4  max-md:border-b border-gray-700 my-1 "
            >
              Contact us
            </Link>
            {userInfo ? (
              <span>
                Hi,{" "}
                {userInfo.given_name
                  ? userInfo.given_name.split(" ")[0]
                  : userInfo.name.split(" ")[0]}
              </span>
            ) : (
              <Link
                className="text-white mr-4 "
                onClick={() => setShowLogin(true)}
              >
                Login
              </Link>
            )}
            {userInfo ? (
              <Link onClick={handleLogout} className="text-white ml-4 mr-4 ">
                Logout
              </Link>
            ) : null}
          </ul>
          {/* <hr className="max-md:hidden  absolute top-20 border-gray-700 w-[90%] items-center" /> */}
          <button
            className="md:hidden bg-slate-50 fixed top-5 right-5 text-black"
            onClick={() => setMobile(!Mobile)}
          >
            {Mobile ? <IoMdMenu /> : <RxCross2 />}
          </button>
        </div>
      </nav>
      {/* <Login onClose={handleCloseLogin} visible={showLogin} />
      <Register onClose={handleCloseRegister} visible={showRegister} /> */}
      {currentForm === "login" ? (
        <Login
          onClose={handleCloseLogin}
          visible={showLogin}
          onFormSwitch={toggleForm}
        />
      ) : (
        <Register
          onClose={handleCloseRegister}
          visible={showRegister}
          onFormSwitch={toggleForm}
        />
      )}
    </>
  );
};

export default Navbar;
