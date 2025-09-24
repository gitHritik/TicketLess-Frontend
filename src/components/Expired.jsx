/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { FiEye } from "react-icons/fi";

import { CiCalendarDate } from "react-icons/ci";
import AOS from "aos";
import "aos/dist/aos.css";

const Expired = ({ bookings }) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div data-aos="fade-up">
      <div className="rounded-lg">
        {bookings.map((item) => (
          <div
            key={item._id}
            className="justify-between mb-6 rounded-lg border-[1px] border-stone-300  bg-white p-6 shadow-md sm:flex sm:justify-start"
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
                    Expired
                  </span>
                </p>
                <p className="mt-3 text-lg ">
                  <span className="flex align-middle gap-1">
                    <CiClock2 className="text-[29px] text-[#1d4ed8]" />
                    Expired
                  </span>
                </p>
                <p className="mt-3 text-lg ">
                  <span className="flex align-middle  gap-1">
                    <GoPeople className="text-[29px] text-[#1d4ed8]" />
                    {item.People.adult > 0 && <>Adult {item.People.adult} </>}
                    {item.People.reduced > 0 && <>Kids {item.People.reduced}</>}
                  </span>
                </p>
                <p className="mt-3 text-lg line-through">
                  <span className="flex align-middle  gap-1">
                    <FiEye className="text-[29px] text-[#1d4ed8]" />{" "}
                    {item.userId}
                  </span>
                </p>
              </div>

              {/* add & minus quantity */}
              <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center border-gray-100"></div>
                <div className="flex items-center space-x-4">
                  <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mt-[56px] ">
                    Expired
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expired;
