/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { BACKEND_URL } from "../constant";

const Success = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("session_id");

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  useEffect(() => {
    const saveBooking = async () => {
      if (sessionId) {
        try {
          const response = await axios.post(`${BACKEND_URL}/api/booking`, {
            sessionId,
          });
          console.log("Booking saved:", response.data);
        } catch (error) {
          console.error("Error saving booking:", error);
        }
      }
    };

    saveBooking();
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-500 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg">Thank you for your booking!</p>
      </div>
      <Link to="/booking">
        <div className="mt-8 px-6 py-3 bg-green-500 text-white rounded-md shadow-md cursor-pointer hover:bg-green-600 transition-colors duration-300">
          <p className="text-lg font-semibold">Go To Booking Page</p>
        </div>
      </Link>
    </div>
  );
};

export default Success;
