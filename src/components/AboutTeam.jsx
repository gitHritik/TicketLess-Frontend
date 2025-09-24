/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { AboutTeamdata } from "../pages/data";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutTeam = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <div className=" offer mt-4 pb-8 bg-white" data-aos="fade-up">
        <div className="offer w-[60%] m-auto max-[830px]:w-[85%] max-[540px]:w-[95%]">
          <div className="text text-center py-8 font-bold text-3xl text-gray-700 m-auto">
            Meet the management team
          </div>
          <div className="card grid grid-cols-3 max-[450px]:flex-col max-[450px]:grid-cols-1">
            {AboutTeamdata.map((item) => (
              <div
                className=" items-center text-center max-[450px]:mb-6 m-auto mb-8"
                key={item}
              >
                <img
                  src={item.img}
                  className="max-w-[90px] h-[90px] rounded-[50%] m-auto max-[750px]:w-[90px] max-[750px]:h-[90px]"
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

export default AboutTeam;
