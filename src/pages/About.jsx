/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React from "react";
import banner from "../images/indian-museum1.jpg";
import AboutSections from "../components/AboutSections";
import AboutTeam from "../components/AboutTeam";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const About = () => {
  return (
    <>
      <Navbar />
      <div
        className=" bg-cover bg-no-repeat bg-center h-[250px] flex flex-col justify-center items-center z-10 "
        style={{
          backgroundImage: `url(${banner})`,
          //   filter: `brightness(70%)`,
        }}
      >
        <h1 className=" text-white font-bold text-5xl text-center m-auto">
          About Us
        </h1>
      </div>
      <div className="about_details text-center my-24">
        <p className="max-[1210px]:w-[40%] max-[1210px]:w-[60%] max-[650px]:w-[90%] max-[440px]:text-[12px] w-[32%] m-auto text-black text-[18px]">
          TicketLess is an online booking platform for museums and attractions
          that connects travelers worldwide with more ways to experience
          culture.
        </p>
      </div>
      <div className=" w-[70%] flex m-auto my-75 max-[800px]:flex-col-reverse">
        <div className="text1 w-[45%]  m-auto min-h-[350px] max-[800px]:w-[70%] max-[800px]:w-[90%]">
          <p className=" text-[25px] w-[100%]  m-auto">
            Making culture more accessible
          </p>
          <p className=" w-[100%] m-auto text-[16px] text-justify max-[930px]:text-[15px] ">
            In 2014, Tigets' founders embarked on a mission to make it easier
            for travelers to experience the best museums and attractions
            worldwide. Since then, we've brought millions of people to museums
            and attractions around the world with our instant and intuitive
            mobile booking technology. Every day, we work with thousands of
            renowned museums, thrilling attractions, and hidden gems to offer
            travelers unforgettable experiences.
          </p>
        </div>
        <div className="image w-[40%] m-auto max-[800px]:w-[70%] max-[800px]:mb-4 max-[800px]:w-[90%]">
          <img
            src="https://cdn.pixabay.com/photo/2017/08/06/09/29/man-2590655_960_720.jpg"
            className="max-w-80% md:min-h-[350px] "
            alt=""
          />
        </div>
      </div>
      {/* ...................................... */}
      <section>
        <AboutSections />
      </section>
      <section>
        <AboutTeam />
      </section>
      <Footer />
    </>
  );
};

export default About;
