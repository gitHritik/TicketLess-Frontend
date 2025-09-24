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

const Cancel = ({ bookings }) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <div data-aos="fade-up">
      <div className="rounded-lg">
        {sortedBookings.map((item) => (
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
                    Cancelled
                  </span>
                </p>
                <p className="mt-3 text-lg ">
                  <span className="flex align-middle gap-1">
                    <CiClock2 className="text-[29px] text-[#1d4ed8]" />
                    {item.Time}
                  </span>
                </p>
                <p className="mt-3 text-lg ">
                  <span className="flex align-middle  gap-1">
                    <GoPeople className="text-[29px] text-[#1d4ed8]" />{" "}
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
                  <button className="py-2.5 px-5 me-2 mb-2 mt-[56px]  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    Cancelled
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

export default Cancel;
