import React from "react";
import "./Bookings.css";

const Bookings = () => {
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 8, 91, 1, 2, 2, 3, 1, 4, 56,
  ];

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
          {arr.map((a, ind) => {
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
                  <p>Surat Textiles</p>
                </div>
                <div>
                  <p>Akash Shipping</p>
                </div>
                <div>
                  <p>22 Aug, 2022</p>
                </div>
                <div>
                  <p>Hambantota</p>
                </div>
                <div>
                  <p>Chicago</p>
                </div>
                <div>
                  <p>Rs. 1,29,000/-</p>
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
