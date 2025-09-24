/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Aboutofferdata } from "../pages/data";
import AOS from "aos";
import "aos/dist/aos.css";
const AboutSections = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <div className=" offer my-6 pb-8 bg-slate-100" data-aos="fade-up">
        <div className="offer w-[70%] m-auto max-[600px]:w-[95%]">
          <div className="text text-center py-8 font-bold text-3xl text-gray-700 m-auto">
            What we offer
          </div>
          <div className="card flex max-[450px]:flex-col">
            {Aboutofferdata.map((item) => (
              <div
                className=" items-center text-center max-[450px]:mb-6 m-auto"
                key={item}
              >
                <img
                  src={item.img}
                  className="max-w-[150px] h-[150px] rounded-[50%] m-auto max-[750px]:w-[90px] max-[750px]:h-[90px]"
                  alt=""
                />
                <p className="  text-[15px] font-bold text-gray-600 max-[750px]:text-[13px]">
                  {item.title}
                </p>
                <p className="w-[75%] m-auto text-gray-500 text-[14px] max-[750px]:text-[12px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSections;
