/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect, useState } from "react";
import Modal from "./Modal";
import Payment from "./Payment";
import Costomer_image from "./Costomer_image";
import Footer from "./Footer";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../constant";

const PopularBookTickets = () => {
  const [data, setData] = useState("");
  const [wholeData, setWholeData] = useState("");

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${BACKEND_URL}/api/images/popular/` + path);
      setData(res.data.popularPlaces);
      setWholeData(res.data);
    };
    getData();
  }, [path]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `${BACKEND_URL}/api/images/popularUnlease/` + path
      );
      setData(res.data.popularPlaces);
      setWholeData(res.data);
    };
    getData();
  }, [path]);

  return (
    <>
      <div className="">
        <Modal image={data?.Mimage} />
      </div>

      <div className="">
        <Payment
          image={data?.Mimage}
          price={data?.Mprice}
          include={wholeData?.included}
          notIncluded={data?.notincluded}
          Location={wholeData.location}
          MuseumName={data.Mname}
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
      {/* <div className=" w-[80%] m-auto mb-10">
        <Costomer_image
          images={wholeData?.customerImages}
          comment={wholeData?.comments}
          popularOne={data?.popularPlaces}
        />
      </div> */}
      <div className="suggestion">
        <Footer />
      </div>
    </>
  );
};

export default PopularBookTickets;
