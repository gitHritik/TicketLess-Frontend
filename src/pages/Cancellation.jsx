/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { GoVersions } from "react-icons/go";

const Cancellation = ({ booking, onClose, onCancel, visible }) => {
  const [showHours, setShowHours] = useState(true);
  // const [current, setCurrent] = useState(true);

  // const handleCloseHours = () => {
  //   setShowHours(false);
  // };

  // const handleClick = async () => {

  // };

  // if (setCurrent) visible === null;

  if (!visible) return null;
  const handleOnClose = (e) => {
    if (e.target.id === "container") {
      onClose();
      visible == null;
      setShowHours(true);
    }
  };

  const handleCancel = () => {
    onCancel(booking._id);
    setShowHours(!visible);
  };

  return (
    <>
      {showHours ? (
        <div className="fixed z-50 inset-0 flex h-[full] items-center justify-center bg-black bg-opacity-50">
          <div className="md:max-w-sm max-w-[20rem] p-6 bg-white border border-gray-200 rounded-lg shadow  dark:border-gray-700">
            <h1 className="mb-3 text-[20px] text-black text-center font-bold">
              Are you absolutely sure?
            </h1>
            <p className="text-center md:text-[13px] text-[11px] text-gray-600 font-sans">
              This action cannot be undone. This will permanently delete your
              tickets and remove your dote from our servers.
            </p>
            <div className="flex flex-row justify-between">
              <button
                id="container"
                type="button"
                onClick={handleOnClose}
                className=" text-black hover:text-black border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg md:text-sm text-[12px] leading-[12px] px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Continue
              </button>
            </div>
          </div>
          {/* <HoursPage onClose={handleCloseHours} visible={showHours} /> */}
        </div>
      ) : (
        <div className="flex justify-center items-center align-middle h-[full] fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10">
          <div className="block max-w-[306px] md:max-w-full rounded-lg bg-white p-6 text-surface shadow-secondary-1 dark:bg-surface-dark text-black">
            <h5 className="mb-2 text-xl font-medium leading-tight">
              Money Refund
            </h5>
            <p className="mb-4 md:text-sm text-[14px] ">
              Your Money Will Be Refunded in 24 hours. Thankyou for connecting
              with ticketless
            </p>
            <button
              type="button"
              id="container"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleOnClose}
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cancellation;
