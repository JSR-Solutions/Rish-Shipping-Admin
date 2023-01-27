import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import Loader from "../../SharedComponents/loader/loader";
import { toast } from "react-toastify";

// import { search } from "../../utils/helpers";

import "./forms.css";

const Forms = () => {
  let navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [allForms, setAllForms] = useState([]);
  const [status, setStatus] = useState("ENQUIRY");
  const [show, setShow] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState(false);
  const [link, setLink] = useState("");
  const [booking, setBooking] = useState();
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [isSortedByDate, setIsSortedByDate] = useState(false);
  const [isSortedByCompanyName, setIsSortedByCompanyName] = useState(false);
  const [isSortedByShipperName, setIsSortedByShipperName] = useState(false);
  const [isSortedByAmount, setIsSortedByAmount] = useState(false);
  useEffect(() => {
    fetchForms();
  }, [status]);

  const fetchForms = async () => {
    try {
      const formResponse = await axios({
        method: "GET",
        url: `https://rish-shipping-backend-api.vercel.app/api/forms/${status}`,
       
      });
      setForms(formResponse.data.data);
      setAllForms(formResponse.data.data);
      setLoaded(true);
      console.log(forms);
    } catch (error) {}
  };

  const handleClose = () => {
    setShow(false);
    setConfirmationStatus(false);
  };

  const handleButtonClick = (e, booking) => {
    if (status === "Pending") {
      setShow(true);
      setForms(booking);
    }
  };

  

  const searchBookings = (e) => {
    const filteredForms = [];
    for (const form of allForms) {
      if (
        form.clientCompany.name.toLowerCase().includes(query.toLowerCase())
      ) {
        filteredForms.push(form);
      }
    }

    setForms(filteredForms);
  };
  function sortByCompanyName(e) {
    e.preventDefault();
    console.log("sorting");
    let temparr = [...forms];
    temparr.sort((a, b) =>
      isSortedByCompanyName
        ? b.clientCompany.name
            .toString()
            .localeCompare(a.clientCompany.name.toString())
        : a.clientCompany.name
            .toString()
            .localeCompare(b.clientCompany.name.toString())
    );
    setForms(temparr);
    setIsSortedByCompanyName(!isSortedByCompanyName);
  }
  function sortByShipperName(e) {
    e.preventDefault();
    console.log("sorting");
    let temparr = [...forms];
    temparr.sort((a, b) =>
      isSortedByShipperName
        ? b.shippingCompany.name
            .toString()
            .localeCompare(a.shippingCompany.name.toString())
        : a.shippingCompany.name
            .toString()
            .localeCompare(b.shippingCompany.name.toString())
    );
    setForms(temparr);
    setIsSortedByShipperName(!isSortedByShipperName);
  }

  function sortByDate(e) {
    e.preventDefault();
    console.log("sorting");
    let temparr = [...forms];
    temparr.sort((a, b) =>
      isSortedByDate
        ? new Date(a.deliveryDateRequired) - new Date(b.createdAt)
        : new Date(b.deliveryDateRequired) - new Date(a.createdAt)
    );
    setIsSortedByDate(!isSortedByDate);
    setForms(temparr);
  }
  function sortByAmount(e) {
    e.preventDefault();
    let temparr = [...forms];
    temparr.sort((a, b) =>
      isSortedByAmount
        ? a.bookingCost - b.bookingCost
        : b.bookingCost - a.bookingCost
    );
    setIsSortedByAmount(!isSortedByAmount);
    setForms(temparr);
  }

  return (
    <div className="bookings-parent-div">
      <div className="bookings-actions-div">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <h3>Form Details</h3>
          </Modal.Header>
          <Modal.Body>
            
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
                setForms(allForms);
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
          <button onClick={(e) => sortByCompanyName(e)}>Sort By Company</button>
          <button onClick={(e) => sortByShipperName(e)}>Sort By Shipper</button>
          <button onClick={(e) => sortByDate(e)}>Sort By Date Requested</button>
          <button onClick={(e) => sortByAmount(e)}>Sort By Amount</button>
        </div>
      </div>
      <div className="bookings-status-div"></div>
      <div className="bookings-list-div">
        <div className="status-div">
          <button
            className={status === "ENQUIRY" ? "activeee" : "status-tab-btn"}
            onClick={() => setStatus("ENQUIRY")}
          >
            Enquiry
          </button>
          <button
            className={status === "PARTNER" ? "activeee" : "status-tab-btn"}
            onClick={() => setStatus("PARTNER")}
          >
            Partner
          </button>

          {/*<button
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
            </button>*/}
          <div style={{ width: "70%" }}> </div>
        </div>
        <div className="bookings-list-header">
          <div>
            <p>Name</p>
          </div>
          <div>
            <p>Phone Number</p>
          </div>
          <div>
            <p>Received At</p>
          </div>
          <div>
            <p>Country</p>
          </div>
          <div>
            <p>Email</p>
          </div>
          <div>
            <p>View</p>
          </div>
        </div>
        <div className="bookings-list-items-div">
          {loaded ? (
            <>
              {forms.map((form, ind) => {
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
                      <p>{form.name}</p>
                    </div>
                    <div>
                      <p>{form.phoneNumber}</p>
                    </div>
                    <div>
                      <p>{form.createdAt.substring(0, 10)}</p>
                    </div>
                    <div>
                      <p>{form.email}</p>
                    </div>
                    <div>
                      <p>{form.country}</p>
                    </div>
                    
                    <div>
                      <button
                        onClick={() => setShow(true)}
                        className="booking-view-btn"
                      >
                        VIEW
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Forms;
