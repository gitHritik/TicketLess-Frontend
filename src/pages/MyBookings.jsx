/* eslint-disable no-unused-vars */

import banner from "../images/indian-museum1.jpg";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Upcoming from "../components/Upcoming";
import Expired from "../components/Expired";
import Cancel from "../components/Cancel";
import axios from "axios";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "../constant";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    AOS.init();
    AOS.refresh();

    // Function to validate token and fetch userId
    const fetchUserIdAndBookings = async () => {
      try {
        const validateToken = await fetch(
          `${BACKEND_URL}/auth/validate-token`,
          {
            method: "GET",
            credentials: "include", // Ensure cookies are sent
          }
        );

        const { userId } = await validateToken.json();

        // Fetch user bookings based on userId
        const response = await axios.get(
          `${BACKEND_URL}/api/booking/${userId}`
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching userId or bookings:", error);
      }
    };

    fetchUserIdAndBookings();
  }, []);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onUpdateBooking = (bookingId, newStatus) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking._id === bookingId ? { ...booking, Status: newStatus } : booking
      )
    );
  };
  const upcomingBookings = bookings.filter(
    (booking) => booking.Status === "confirmed"
  );
  const expiredBookings = bookings.filter(
    (booking) => booking.Status === "expired"
  );
  const cancelledBookings = bookings.filter(
    (booking) => booking.Status === "cancelled"
  );

  return (
    <div>
      <Navbar />
      <div
        className=" bg-cover bg-no-repeat bg-center h-[250px] flex flex-col justify-center items-center z-10 "
        style={{
          backgroundImage: `url(${banner})`,
          //   filter: `brightness(70%)`,
        }}
      >
        <h1 className=" text-white font-bold text-5xl text-center m-auto">
          Your Bookings
        </h1>
      </div>
      <main className="py-12 max-w-7xl container mx-auto px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between md:gap-8 gap-4">
            <div className="space-y-6 md:w-full">
              {/* <Bookings />
              
              <Bookings /> */}
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Upcomings" value="1" />
                    <Tab label="Expired" value="2" />
                    <Tab label="Cancelled" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Upcoming
                    bookings={upcomingBookings}
                    onUpdateBooking={onUpdateBooking}
                  />
                </TabPanel>
                <TabPanel value="2">
                  <Expired bookings={expiredBookings} />
                </TabPanel>
                <TabPanel value="3">
                  <Cancel bookings={cancelledBookings} />{" "}
                </TabPanel>
              </TabContext>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyBookings;
