import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

// import { search } from "../../utils/helpers";
import "./Bookings.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [status, setStatus] = useState("Confirmed");
  const [show, setModalShow] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState(false);
  const [link, setLink] = useState("");
  const [booking, setBooking] = useState();
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchBookings();
  }, [status]);

  const fetchBookings = async () => {
    try {
      const bookingResponse = await axios({
        method: "POST",
        url: "https://rish-shipping-backend-api.vercel.app/admin/api/booking/",
        data: {
          status: status,
        },
      });
      setBookings(bookingResponse.data.data);
      setAllBookings(bookingResponse.data.data);
      console.log(bookings);
    } catch (error) {}
  };

  const handleClose = () => {
    setModalShow(false);
    setConfirmationStatus(false);
  };

  const handleButtonClick = (e, booking) => {
    if (status === "Pending") {
      setModalShow(true);
      setBooking(booking);
    }
  };

  const approveBooking = async (e) => {
    e.preventDefault();
    try {
      await axios({
        method: "PATCH",
        url: `https://rish-shipping-backend-api.vercel.app/admin/api/booking/approve/${booking._id}`,
        data: {
          trackingLink: link,
        },
      });

      setBooking();
      setModalShow(false);
      fetchBookings();
      setLink("");
      setConfirmationStatus(false);
    } catch (error) {
      toast(error.message);
    }
  };

  const searchBookings = (e) => {
    const filteredBookings = [];
    for (const booking of allBookings) {
      if (
        booking.clientCompany.name.toLowerCase().includes(query.toLowerCase())
      ) {
        filteredBookings.push(booking);
      }
    }

    setBookings(filteredBookings);
  };

  return (
    <div className="bookings-parent-div">
      <div className="bookings-actions-div">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>Confirmation</h3>
          </Modal.Header>
          <Modal.Body>
            {confirmationStatus ? (
              <div>
                <input
                  className="input_link"
                  value={link}
                  name="link"
                  placeholder="Enter the Link"
                  onChange={(e) => {
                    e.preventDefault();
                    setLink(e.target.value);
                  }}
                ></input>
                <div className="confirmation_btns">
                  <button className="yes_btn" onClick={approveBooking}>
                    Approve
                  </button>
                  <button onClick={handleClose} className="cancel_btn">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p>Are you sure you want to confirm this booking?</p>
                <div className="confirmation_btns">
                  <button
                    onClick={() => setConfirmationStatus(true)}
                    className="yes_btn"
                  >
                    Yes
                  </button>
                  <button onClick={handleClose} className="cancel_btn">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
        <div className="search-div">
          <input
            type="text"
            placeholder="Search Bookings"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value === "") {
                setBookings(allBookings);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                searchBookings();
              }
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              searchBookings(e);
            }}
          >
            Search
          </button>
        </div>
        <div className="sort-div">
          <button>Sort By Company</button>
          <button>Sort By Shipper</button>
          <button>Sort By Date Requested</button>
          <button>Sort By Amount</button>
        </div>
      </div>
      <div className="bookings-status-div"></div>
      <div className="bookings-list-div">
        <div className="status-div">
          <button
            className={status === "Confirmed" ? "activee" : "status-tab-btn"}
            onClick={() => setStatus("Confirmed")}
          >
            Confirmed
          </button>
          <button
            className={status === "Pending" ? "activee" : "status-tab-btn"}
            onClick={() => setStatus("Pending")}
          >
            Pending
          </button>
          <button
            className={status === "Cancelled" ? "activee" : "status-tab-btn"}
            onClick={() => setStatus("Cancelled")}
          >
            Cancelled
          </button>
          <button
            className={status === "In Transit" ? "activee" : "status-tab-btn"}
            onClick={() => setStatus("In Transit")}
          >
            In Transit
          </button>
          <button
            className={status === "Completed" ? "activee" : "status-tab-btn"}
            onClick={() => setStatus("Completed")}
          >
            Completed
          </button>
          <button
            className={status === "Rejected" ? "activee" : "status-tab-btn"}
            onClick={() => setStatus("Rejected")}
          >
            Rejected
          </button>
        </div>
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
                  <button
                    onClick={(e) => {
                      handleButtonClick(e, booking);
                    }}
                    className="booking-view-btn"
                  >
                    {booking.status === "Pending" ? "Approve" : "VIEW"}
                  </button>
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
