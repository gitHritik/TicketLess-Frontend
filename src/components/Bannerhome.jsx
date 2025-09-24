/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import banner from "../images/indian-museum1.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { BACKEND_URL } from "../constant";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

const Bannerhome = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const fetchResults = async (searchQuery) => {
    try {
      const [response1, response2] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/images/search/?q=${searchQuery}`),
        axios.get(`${BACKEND_URL}/api/images/searchLocation/?q=${searchQuery}`),
      ]);

      const combinedResults = [
        ...(response1.data || []), // Ensure response.data is an array
        ...(response2.data || []),
      ];

      // Use a Set to filter out duplicate names
      const uniqueResults = Array.from(
        new Set(combinedResults.map((item) => JSON.stringify(item)))
      ).map((item) => JSON.parse(item));

      setResults(uniqueResults);
      setIsDropdownVisible(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Debounced function to limit API calls
  const debouncedFetchResults = debounce(fetchResults, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      debouncedFetchResults(value);
    } else {
      setResults([]);
      setIsDropdownVisible(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      await fetchResults(query);
    }
  };

  return (
    <>
      <div className="relative" data-aos="fade-up">
        <div
          className="bg-cover bg-no-repeat bg-center h-[550px] flex flex-col justify-center items-center z-10"
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <div
            className="break-inside-avoid-column 
            md:bottom-[7rem] bottom-[11rem] text-center md:left-[276px] left-[24px]"
          >
            <p className="md:text-7xl text-5xl font-bold text-white mx-auto z-100 max-[530px]:text-3xl">
              Escape to Paradise with <br className="" />
              Ticketless
            </p>

            <div className="my-4 md:w-96 mx-auto relative">
              <form onSubmit={handleSearch} className="max-w-md mx-auto">
                <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                  <div className="grid place-items-center h-full w-12 text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="text"
                    id="search"
                    placeholder="Search something.."
                    value={query}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
              {isDropdownVisible && results.length > 0 && (
                <ul className="absolute overflow-y-hidden z-50 bg-white p-1 mt-1 rounded-lg max-h-60  w-full shadow-lg">
                  {results.map((item) => (
                    <>
                      {item.museumName && (
                        <Link
                          to={"/locationinfo/" + item._id}
                          key={item._id + "-museum"}
                        >
                          <li className="p-2 hover:bg-gray-200 cursor-pointer">
                            {item.museumName}
                          </li>
                        </Link>
                      )}
                      {item.location && (
                        <Link
                          to={"/locationinfo/" + item._id}
                          key={item._id + "-location"}
                        >
                          <li className="p-2 hover:bg-gray-200 cursor-pointer">
                            {item.location}
                          </li>
                        </Link>
                      )}
                    </>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="bg-amber-800 hover:bg-amber-700 text-white font-bold py-3 px-2 rounded text-2xl mt-4"
            >
              Find Your Favourite
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bannerhome;
