/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import PopularPlaces from "../components/PopularPlaces";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Comment from "../components/Comment";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constant";

const DestInfromation = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showComment, setShowCommment] = useState(false);
  const [showHeart, setShowHeart] = useState(true);
  const [data, setData] = useState("");

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `${BACKEND_URL}/api/images/singleImage/` + path
      );
      setData(res.data);
    };
    getData();
  }, [path]);

  // const [color,setColor] = useState(white)
  const handleCloseComment = () => {
    setShowCommment(false);
  };

  const handleClick = () => {
    setShowHeart(!showHeart);
  };

  return (
    <div className="md:block">
      <Navbar />
      <article className="" data-aos="fade-up">
        <div className="mb-4 md:mb-0 w-full mx-auto relative">
          {data.locationImage && (
            <img
              src={data.locationImage[0]}
              className="w-full object-cover lg:rounded brightness-50"
              style={{ height: "28em" }}
              alt="Blog Cover"
            />
          )}
          <div className="px-4 lg:px-0 text-center">
            <h2 className="text-4xl font-semibold text-gray-800 leading-tight">
              {data.location}
            </h2>
            <a
              href="#"
              className="py-2  text-green-700 inline-flex items-center justify-center align-middle"
            >
              {data.museumName}
            </a>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-12 justify-center">
          <div className="px-4 mt-3 lg:px-0  text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
            <p>{data.description}</p>
          </div>
        </div>
        <div className="w-full text-center mt-7">
          <Link to={"/booking/" + path}>
            <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Book Tickets
            </button>
          </Link>
        </div>

        <div className="flex text-center justify-around align-middle mt-8 md:w-full">
          <div className="flex items-center space-x-2">
            <BiCommentDetail
              className="text-gray-600 cursor-pointer"
              onClick={(e) => setShowCommment(!showComment)}
            />
            <span className="text-gray-600">{data.comment} comments</span>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleClick}
          >
            {showHeart ? (
              <AiOutlineHeart className="text-red-500 " />
            ) : (
              <FaHeart className="text-red-500 " />
            )}

            <span className="text-gray-600">{data.likes} likes</span>
          </div>
          <div className="flex items-center space-x-2 ">
            <a
              href="/"
              className="text-green-700 inline-flex items-center justify-center"
            >
              Back to Home
              <AiOutlineArrowRight className="ml-2" />
            </a>
          </div>
        </div>
      </article>
      <Comment
        onClose={handleCloseComment}
        comment={data.comment}
        visible={showComment}
      />

      <PopularPlaces
        location={data.location}
        popular={data.popularPlaces}
        category={data.category}
      />
      <Footer />
    </div>
  );
};

export default DestInfromation;
