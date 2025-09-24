import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useState } from "react";
import { BACKEND_URL } from "../constant";

function UnleaseMuseum() {
  const [data, setData] = useState([]);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const fetchImagesByCategory = async (category) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/images/unlease/${category}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      const imageData = await response.json();
      setData(imageData);
    } catch (error) {
      console.error("Error fetching images:", error.message);
    }
  };
  const shuffledImages = [...data].sort(() => Math.random() - 0.5);

  useEffect(() => {
    fetchImagesByCategory("Monument");
  }, []);
  return (
    <div className="">
      <div className="md:w-3/4 w-full m-auto " data-aos="fade-up">
        <div className="md:text-[40px] text-[14px] text-center text-[#88563b]  ">
          <h1 className="font-[900] md:mx-10 md:my-3 py-4">
            Explore Antics and Historical Items
          </h1>
        </div>
        <div className="items-start mb-2 grid md:grid-cols-3 grid-cols-2 gap-4 mx-[22px]">
          {shuffledImages.slice(0, 6).map((d, id) => (
            <div
              key={id}
              className="mb-5 md:block cursor-pointer bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex-none  md:w-[95%]  md:pb-4 border rounded-lg"
            >
              <Link to={"/unleaseinfo/" + d?._id}>
                <div className="relative overflow-hidden bg-cover bg-no-repeat">
                  <img
                    src={d.locationImage[0]}
                    alt=""
                    className="rounded-t-lg md:w-[347px] md:h-[270px] w-[167px] h-[117px]"
                  />
                </div>

                <div className="">
                  <div className="md:p-6 p-2">
                    <h5 className="mb-1 md:text-xs text-[11px] leading-[1.25] font-medium  md:leading-tight text-gray-400 ">
                      {d.location}
                    </h5>
                    <h5 className="mb-1 md:text-xl ext-[16px] leading-[1.25] font-medium  md:leading-tight text-neutral-800 ">
                      {d.museumName}
                    </h5>
                    <p className="mb-2 md:text-base text-[13px]  leading-[1.25]  text-neutral-600 ">
                      {d.description.length > 150
                        ? `${d.description.substring(0, 150)}...`
                        : d.description}
                    </p>
                  </div>
                  <div className="ratingandprice flex justify-between md:w-[90%] m-auto mb-2 md:px-0 px-2">
                    <div className=" flex gap-1">
                      <p className="text-gray-900 md:text-xs font-medium text-[10px] leading-[1rem]">
                        <span className="fa fa-star checked text-orange-400"></span>{" "}
                        {d.rating}
                      </p>
                      <p className="text-gray-400 md:text-xs leading-[17px] text-[8px] font-medium">
                        ({d.views})
                      </p>
                    </div>
                    <button className="price text-center text-gray-800  md:text-[1rem] text-[11px] leading-[1px]">
                      <h3>Know More</h3>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UnleaseMuseum;
