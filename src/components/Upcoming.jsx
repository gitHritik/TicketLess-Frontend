/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { CiLocationOn } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { FiEye } from "react-icons/fi";
import Cancellation from "../pages/Cancellation";
import { CiCalendarDate } from "react-icons/ci";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "./../constant";
import { format } from "date-fns";

const Upcoming = ({ bookings, onUpdateBooking }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const handleOpenCancellation = (booking) => {
    setSelectedBooking(booking);
    setShowLogin(true);
  };

  const handleCloseCancellation = () => {
    setSelectedBooking(null);
    setShowLogin(false);
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.patch(`${BACKEND_URL}/api/${bookingId}`, {
        status: "cancelled",
      });
      onUpdateBooking(bookingId, "cancelled");
    } catch (error) {
      console.error("Failed to cancel booking", error);
    }
  };

  
  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <>
      <div data-aos="fade-up">
        <div className="rounded-lg ">
          {sortedBookings.map((item) => (
            <div
              key={item._id}
              className="justify-between  mb-6 rounded-lg border-[1px] border-stone-300  bg-white p-6 shadow-md sm:flex sm:justify-start"
            >
              <img
                src={item.locationImage}
                className="w-full h-[15rem] rounded-lg sm:w-[17rem]"
              />

              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <div className="">
                    <h1 className="text-2xl  font-[1900px] font-inherit text-gray-900  mb-4">
                      {item.museumName}
                    </h1>
                  </div>
                  <h2 className="text-lg ">
                    <span className="flex align-middle  gap-1">
                      <CiLocationOn className="text-[29px] text-[#1d4ed8]" />
                      {item.location}
                    </span>
                  </h2>
                  <p className="mt-3 text-lg ">
                    <span className="flex align-middle gap-1">
                      <CiCalendarDate className="text-[29px] text-[#1d4ed8]" />
                      {format(new Date(item.date), "dd-MM-yyyy")}
                    </span>
                  </p>
                  <p className="mt-3 text-lg ">
                    <span className="flex align-middle gap-1">
                      <CiClock2 className="text-[29px] text-[#1d4ed8]" />
                      {item.Time}
                    </span>
                  </p>
                  <p className="mt-3 text-lg ">
                    <span className="flex align-middle gap-1">
                      <GoPeople className="text-[29px] text-[#1d4ed8]" />
                      {item.People.adult > 0 && <>Adult {item.People.adult} </>}
                      {item.People.reduced > 0 && (
                        <>Kids {item.People.reduced}</>
                      )}
                    </span>
                  </p>
                  <p className="mt-3 text-lg ">
                    <span className="flex align-middle  gap-1">
                      <FiEye className="text-[29px] text-[#1d4ed8]" />{" "}
                      {item.userId}
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100"></div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleOpenCancellation(item)}
                      className="text-white bg-gradient-to-r mt-[56px] from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Cancel Ticket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Cancellation
        booking={selectedBooking}
        onClose={handleCloseCancellation}
        onCancel={handleCancelBooking}
        visible={showLogin}
      />
    </>
  );
};

export default Upcoming;
