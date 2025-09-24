/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Dropdown } from "primereact/dropdown";
import { FaPeopleRoof } from "react-icons/fa6";
import { Button } from "flowbite-react";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaWheelchair } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { HiOutlineCheck } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";

import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import TicketSelectionPopup from "./TicketSelectionPopup";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setDate,
  setTime,
  setTickets,
  setPrice,
  setImage,
  resetPayment,
  setLocation,
  setmuseumName,
} from "../slices/paymentSlices.js";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { BACKEND_URL } from "../constant.js";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

const Payment = ({
  price,
  include,
  notIncluded,
  image,
  Location,
  MuseumName,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date();
  const [selectedTime, setSelectedTime] = useState({
    name: "09:00-10:00",
    code: "NY",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedPriceReducer, setPriceReducer] = useState("");
  const [selectedPriceAdult, setPriceAdult] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [currentForm, setCurrentForm] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);

  const times = [
    { name: "09:00-10:00 AM", code: "T1" },
    { name: "10:00-11:00 AM", code: "T2" },
    { name: "11:00-12:00 PM", code: "T3" },
    { name: "12:00-01:00 PM", code: "T4" },
    { name: "01:00-02:00 PM", code: "T5" },
    { name: "02:00-03:00 PM", code: "T6" },
    { name: "03:00-04:00 PM", code: "T7" },
    { name: "04:00-05:00 PM", code: "T8" },
    { name: "05:00-06:00 PM", code: "T9" },
    { name: "06:00-07:00 PM", code: "T10" },
    { name: "07:00-08:00 PM", code: "T11" },
    { name: "08:00-09:00 PM", code: "T12" },
    { name: "09:00-10:00 PM", code: "T13" },
  ];

  const handleSaveTickets = (ticketCounts, priceReducer, priceAdult) => {
    setSelectedTickets(ticketCounts);
    setPriceReducer(priceReducer);
    setPriceAdult(priceAdult);
    dispatch(setTickets(ticketCounts));
    dispatch(setLocation(Location));
    dispatch(setmuseumName(MuseumName));
  };

  const handleTimeSelection = (time, event) => {
    setSelectedTime(time);
    setIsModalOpen(false); // Close the modal after selecting a time
    event.stopPropagation();
    handleTimeChange(time);
  };

  const handleTimeChange = (time) => {
    dispatch(setTime(time.name));
  };
  const handleDateChange = (date) => {
    setStartDate(date);
    dispatch(setDate(date.toISOString())); // Correct dispatch call
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const renderPrice = () => {
    if (!selectedTickets) return price;

    let newPrice = selectedPriceAdult;

    // Add selectedPriceReducer only if it's selected
    if (selectedPriceReducer !== 0) {
      newPrice += selectedPriceReducer - 10;
    }
    dispatch(setPrice(newPrice));

    return newPrice;
  };

  useEffect(() => {
    // Dispatch the image when the component mounts or image prop changes
    if (image) {
      dispatch(setImage(image[0]));
    }
  }, [image, dispatch]);

  const renderSelectedTickets = () => {
    if (!selectedTickets) return "Select Your Tickets";

    const { adult, reduced } = selectedTickets;
    let ticketText = "";
    if (adult > 0) ticketText += `Adult (Age 13+) x ${adult}`;
    if (reduced > 0) {
      if (ticketText) ticketText += ", ";
      ticketText += `Reduced Ticket x ${reduced}`;
    }
    return ticketText;
  };

  const { cart } = useSelector((state) => state.payment);
  console.log(cart);

  const makePayment = async () => {
    try {
      // Validate Token
      const validateToken = await fetch(`${BACKEND_URL}/auth/validate-token`, {
        method: "GET",
        credentials: "include", // Ensure cookies are sent
      });

      if (validateToken.status !== 200) {
        setShowLoginPopup(true);
        return;
      }

      const { userId } = await validateToken.json();
      // console.log("User ID:", userId);

      // Load Stripe
      const stripe = await loadStripe(
        "pk_test_51KaimASI6i4F9vZjKiOFaruoefN681OFGYax24iLCFM6bQF9QKPIdkdQNTMTPspbqePx25Y9EY2yab2nMAjy0nVq001vrBNDfJ"
      );

      const body = {
        products: cart,
        metadata: {
          userId,
          location: cart.location,
          museumName: cart.museumName,
          locationImage: cart.image,
          date: cart.date,
          time: cart.time,
          tickets: JSON.stringify(cart.tickets),
        },
        customer: {
          name: userInfo.name,
          email: userInfo.email,
        },
      };
      const headers = {
        "Content-Type": "application/json",
      };

      // console.log("Sending request to create checkout session...");

      // Create Checkout Session
      const response = await fetch(
        `${BACKEND_URL}/api/create-checkout-session`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const session = await response.json();
      // console.log("Session created:", session);

      if (!session.sessionId) {
        throw new Error("No session ID returned from server");
      }

      // Redirect to Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (result.error) {
        console.log(result.error.message);
      }
    } catch (error) {
      console.error("Error in makePayment:", error);
    }
  };

  const handleCloseLogin = () => {
    setShowLoginPopup(false);
    setCurrentForm("register");
  };
  const handleCloseRegister = () => {
    setShowRegisterPopup(false);
    setCurrentForm("login");
  };
  const toggleForm = (formName) => {
    setCurrentForm(formName);
    if (formName == "login") {
      setShowLoginPopup(true);
      setShowRegisterPopup(false);
    }
    if (formName == "register") {
      setShowLoginPopup(false);
      setShowRegisterPopup(true);
    }
  };

  return (
    <>
      {currentForm === "login" ? (
        <Login
          visible={showLoginPopup}
          onClose={handleCloseLogin}
          onFormSwitch={toggleForm}
        />
      ) : (
        <Register
          visible={showRegisterPopup}
          onClose={handleCloseRegister}
          onFormSwitch={toggleForm}
        />
      )}
      <div className="max-[700px]:flex-col text_and_from w-[80%] m-auto flex justify-evenly max-[967px]:w-[95%] mb-4">
        <div className="text max-[800px]:w-[50%] max-[700px]:m-auto max-[700px]:w-[90%] ">
          <h5 className="text-amber-700 font-bold text-3xl">BESTSELLER</h5>
          <p className="text-[20px] font-[500]">
            Lorem ipsum dolor, sit amet consectetur adipisicing.
          </p>
          <p className="text-[15px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
          <div className="time py-2">
            <p className="text-green-600 text-[15px]">
              Open today : <span className="text-black">09:00 - 19:00</span>
            </p>
          </div>
          <h5>Provider</h5>
          <div className="wheel flex items-center gap-2">
            <FaWheelchair />
            <p>Wheelchair accessible</p>
          </div>
          <div className="wheel flex items-center gap-2">
            <MdPhoneIphone />
            <p>smartphone tickets accepted </p>
          </div>
          <div className="services flex mt-2 items-center gap-2">
            <GrServices className="text-1xl" />
            <p className="font-bold">Services provides :</p>
          </div>
          <p className="w-[40%] text-gray-500 text-[15px] max-[800px]:w-[60%] max-[700px]:w-[90%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam tenetur
            rerum blanditiis itaque vitae eius molestias veniam esse
            consequuntur rem!
          </p>
        </div>
        <div className="from w-[35%] max-[967px]:w-[40%] max-[700px]:m-auto max-[700px]:w-[70%] max-[700px]:mt-6 ">
          <div className="from shadow appearance-none border rounded p-6 ">
            <h4 className="text-[14px] font-bold text-gray-400">From</h4>
            <div className="price font-bold text-[18px] pb-2 text-gray-600">
              Rs. {renderPrice()}
            </div>
            <div className="date py-1 flex items-center shadow appearance-none border rounded">
              <div className="pl-2 lable text-2xl text-gray-400">
                <FaRegCalendarAlt />
              </div>
              <div className="text-center items-center m-auto">
                <DatePicker
                  className="text-center items-center py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  selected={startDate}
                  onChange={handleDateChange}
                  icon="fa fa-calendar"
                  dateFormat="MMMM d, yyyy"
                  minDate={today}
                />
              </div>
            </div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="time mt-3 py-2 flex items-center shadow appearance-none border rounded relative z-80"
            >
              <div className="pl-2 label text-2xl text-gray-400">
                <IoMdTime />
              </div>
              <div className="text-center items-center m-auto">
                {selectedTime && selectedTime.name}
              </div>
              <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                appElement={document.getElementById("root")}
              >
                <div className="flex flex-col justify-center items-center">
                  {times.map((time, index) => (
                    <button
                      key={index}
                      onClick={(event) => handleTimeSelection(time, event)}
                      className={`w-full md:w-14rem mx-2 text-center py-2 border rounded mb-2 ${
                        selectedTime && time.code === selectedTime.code
                          ? "bg-blue-500 text-white"
                          : ""
                      }`}
                    >
                      {time.name}
                    </button>
                  ))}
                </div>
              </Modal>
            </div>
            <div
              onClick={() => setShowPopup(true)}
              className="select-tickets mt-3 py-2 flex justify-center items-center shadow appearance-none border rounded"
            >
              <div className="pl-2 label text-2xl text-gray-400">
                <FaPeopleRoof />
              </div>
              <span className="w-full text-center !text-[14px]">
                {renderSelectedTickets()}
              </span>
              <select
                value={selectedTickets}
                className="md:w-14rem mx-2 text-center overflow-hidden"
              ></select>
            </div>
            <TicketSelectionPopup
              visible={showPopup}
              onClose={handleClose}
              onSave={handleSaveTickets}
              price={price}
            />
            <div className="btn mt-3 w-full">
              <Button
                onClick={makePayment}
                className="bg-green-700 w-full py-[3px]"
              >
                Book now
              </Button>
            </div>
            <div className="cancellation mt-3 bg-slate-200 rounded p-2 flex justify-between items-center gap-4">
              <div className="icon text-3xl text-red-600">
                <GiTakeMyMoney />
              </div>
              <div className="">
                <p className="font-bold text-[14px]">Cancellation policy</p>
                <p className="text-[13px]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="facility my-5 w-[80%] m-auto">
        <div className="whats include">
          <p className="font-bold text-2xl">what`s include</p>
          {include?.map((item, id) => (
            <div key={id} className="flex gap-3 my-2">
              <div className="icon text-3xl font-bold text-green-600">
                <HiOutlineCheck />
              </div>
              <div className="text text-[20px]">{item}</div>
            </div>
          ))}
        </div>
        <div className="drop my-10 max-w-[100%] border-none">
          <Accordion collapseAll className="border-none">
            <AccordionPanel>
              <hr />
              <AccordionTitle className="p-4">What is Flowbite?</AccordionTitle>
              <hr />
              <AccordionContent>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Check out this guide to learn how to&nbsp;
                  <a
                    href="https://flowbite.com/docs/getting-started/introduction/"
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    get started&nbsp;
                  </a>
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel>
              <AccordionTitle className="p-4">
                Is there a Figma file available?
              </AccordionTitle>
              <hr />
              <AccordionContent>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Flowbite is first conceptualized and designed using the Figma
                  software so everything you see in the library has a design
                  equivalent in our Figma file.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Check out the
                  <a
                    href="https://flowbite.com/figma/"
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Figma design system
                  </a>
                  based on the utility classes from Tailwind CSS and components
                  from Flowbite.
                </p>
              </AccordionContent>
            </AccordionPanel>
            <AccordionPanel>
              <AccordionTitle className="p-4">
                What are the differences between Flowbite and Tailwind UI?
              </AccordionTitle>
              <hr />
              <AccordionContent>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  The main difference is that the core components from Flowbite
                  are open source under the MIT license, whereas Tailwind UI is
                  a paid product. Another difference is that Flowbite relies on
                  smaller and standalone components, whereas Tailwind UI offers
                  sections of pages.
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  However, we actually recommend using both Flowbite, Flowbite
                  Pro, and even Tailwind UI as there is no technical reason
                  stopping you from using the best of two worlds.
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Learn more about these technologies:
                </p>
                <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                  <li>
                    <a
                      href="https://flowbite.com/pro/"
                      className="text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Flowbite Pro
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tailwindui.com/"
                      rel="nofollow"
                      className="text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      Tailwind UI
                    </a>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionPanel>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default Payment;
