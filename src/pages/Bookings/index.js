import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Bookings.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const bookingResponse = await axios({
        method: "POST",
        url: "http://localhost:8000/admin/api/booking/",
        data: {
          status: "Pending",
        },
      });
      setBookings(bookingResponse.data.data);
    } catch (error) {}
  };

  return (
    <div className="bookings-parent-div">
      <div className="bookings-actions-div">
        <div className="search-div">
          <input type="text" placeholder="Search Bookings" />
          <button>Search</button>
        </div>
        <div className="sort-div">
          <button>Sort By Company</button>
          <button>Sort By Shipper</button>
          <button>Sort By Date Requested</button>
          <button>Sort By Amount</button>
        </div>
      </div>
      <div className="bookings-list-div">
        <div className="bookings-list-header">
          <div>
            <p>Company</p>
          </div>
          <div>
            <p>Shipper</p>
          </div>
          <div>
            <p>Date Requested</p>
          </div>
          <div>
            <p>Source Port</p>
          </div>
          <div>
            <p>Destination Port</p>
          </div>
          <div>
            <p>Amount</p>
          </div>
          <div>
            <p>View</p>
          </div>
        </div>
        <div className="bookings-list-items-div">
          {bookings.map((booking, ind) => {
            return (
              <div
                style={
                  ind % 2 === 0
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "#efefef" }
                }
                className="bookings-list-item"
              >
                <div>
                  <p>{booking.clientCompany.name}</p>
                </div>
                <div>
                  <p>{booking.shippingCompany.name}</p>
                </div>
                <div>
                  <p>{booking.createdAt.substring(0, 10)}</p>
                </div>
                <div>
                  <p>{booking.sourcePort.name}</p>
                </div>
                <div>
                  <p>{booking.destinationPort.name}</p>
                </div>
                <div>
                  <p>{booking.bookingCost}</p>
                </div>
                <div>
                  <button className="booking-view-btn">VIEW</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
