/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import NewCard from "./NewCard.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const Cards = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className=" bg-[#F6F6F6] !my-14 " data-aos="fade-up">
      <NewCard />
    </div>
  );
};

export default Cards;
