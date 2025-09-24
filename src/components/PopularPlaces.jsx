/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

import RelatedPlaces from "./RelatedPlaces.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

const PopularPlaces = ({ location, popular, category }) => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <section
      className="text-gray-600 mt-12 z-50 md:ml-[150px] md:mr-[150px] flex flex-col md:justify-center md:align-middle"
      data-aos="fade-up"
    >
      <h2 className="md:text-3xl text-xl font-bold text-center ">
        Popular{" "}
        {category && typeof category === "string"
          ? category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
          : "Category"}
        {"s "}
        in {location}
      </h2>
      <div className="container px-5 py-8 mx-auto">
        <div className="flex flex-wrap -m-4">
          <RelatedPlaces popular={popular} category={category} />
        </div>
      </div>
    </section>
  );
};

export default PopularPlaces;
