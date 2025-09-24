/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { IoStar } from "react-icons/io5";

const ReviewComment = ({ comments }) => {
  return (
    <div className="review">
      {comments?.map((item, id) => (
        <div key={id} className=" bg-[#F2F4F7] p-10 mb-4 rounded-lg">
          <div className="user_review">
            <div className="profile flex flex-row gap-3">
              <div className="profilename flex flex-row">
                <p className="w-[50px] h-[50px] text-white bg-blue-800 rounded-full text-center items-center pt-3">
                  M
                </p>
              </div>
              <div className="text flex  flex-col ">
                <div className="name text-[1rem] font-[500] leading-[1.5rem]">
                  {item.className}
                </div>
                <div className="date text-[.75rem] leading-[1rem] ">
                  {item.date}- verified customer
                </div>
              </div>
            </div>
          </div>
          <div className="rating font-bold text-[15px] my-5 flex j items-center gap-3">
            <div className="star text-yellow-400 flex">
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
              <IoStar />
            </div>
            <p className="text-[.875rem] leading-[1.25rem] font-[500]">
              Excellent
            </p>
          </div>
          <div className="paratext">
            <p className=" text-[20px] text-justify text-gray-700 ">
              {item.comment}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewComment;
