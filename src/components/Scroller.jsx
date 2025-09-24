/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { data } from "../pages/data.js";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constant.js";

const Scroller = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const [mobile, SetIsmobile] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (window.innerWidth > "768") {
      SetIsmobile(false);
    }
  }, [mobile]);

  function slideLeft() {
    var slider = document.getElementById("slider");
    if (mobile) {
      slider.scrollLeft = slider.scrollLeft - 260;
    } else {
      slider.scrollLeft = slider.scrollLeft - 800;
    }
  }

  const slideRight = () => {
    var slider = document.getElementById("slider");
    if (mobile) {
      slider.scrollLeft = slider.scrollLeft + 260;
    } else {
      slider.scrollLeft = slider.scrollLeft + 800;
    }
  };

  const handleImage = async () => {
    const data = await axios.get(`${BACKEND_URL}/api/images/scroller`);
    setImages(data.data);
  };

  const shuffledImages = [...images].sort(() => Math.random() - 0.5);

  useEffect(() => {
    handleImage();
  }, []);

  return (
    <>
      <div className="" data-aos="fade-up">
        <div className="md:text-[50px] text-[20px] text-center text-[#88563b]  ">
          <h1 className="font-[900] md:mx-10 md:my-5">
            Discover the Unseen Corners of the World with Ticketless
          </h1>
        </div>
        <div className="relative flex items-center">
          <MdChevronLeft
            className="opacity-50 cursor-pointer hover:opacity-100"
            onClick={slideLeft}
            size={40}
          />
          <div
            id="slider"
            className="w-full md:mx-16 h-full justify-center align-middle overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide no-scrollbar overflow-y-auto"
          >
            {shuffledImages.map((item, id) => (
              <Link to={"/locationinfo/" + item?._id} key={id}>
                <img
                  className="md:h-[550px] md:w-[420px] w-[220px] h-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                  src={item.locationImage[0]}
                  alt="/"
                />
              </Link>
            ))}
          </div>
          <MdChevronRight
            className="opacity-50 cursor-pointer hover:opacity-100"
            onClick={slideRight}
            size={40}
          />
        </div>
      </div>
    </>
  );
};
export default Scroller;
