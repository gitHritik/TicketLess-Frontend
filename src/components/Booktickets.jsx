/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from "react";
import Modal from "./Modal";
import Payment from "./Payment";
import Costomer_image from "./Costomer_image";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constant";

const Booktickets = () => {
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

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(data);
  return (
    <>
      <div className="">
        <Modal image={data?.locationImage} />
      </div>

      <div className="">
        <Payment
          image={data?.locationImage}
          price={data?.price}
          include={data?.included}
          notIncluded={data?.notincluded}
          Location={data.location}
          MuseumName={data.museumName}
        />
      </div>
      <Link to="/">
        <div
          data-aos="fade-up"
          className="fixed bottom-10 z-40  m-auto left-0 right-0 bg-black w-48 h-12 flex items-center justify-center rounded-md shadow-md cursor-pointer"
        >
          <p className="capitalize font-bold text-white">Go Back</p>
        </div>
      </Link>
      <div className=" w-[80%] m-auto mb-10">
        <Costomer_image
          images={data?.customerImages}
          comment={data?.comments}
          popularOne={data?.popularPlaces}
        />
      </div>
      <div className="suggestion">
        <Footer />
      </div>
    </>
  );
};

export default Booktickets;
