import React,{useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

function SingleBooking(props) {
  
 const params = useParams();
 const [bookingId, setBookingId] = useState(params.bookingId);
const [bookingData, setBookingData] = useState({});
const [isLoading, setIsLoading] = useState(false);
const [link,setLink]=useState("");

useEffect(()=>{
  fetchData();
},[]);

const fetchData=()=>{
  axios.get(`https://rish-shipping-backend-api.vercel.app/api/booking/${params.bookingId}`)
  .then((res)=>{
    console.log(res.data.data);
    setBookingData(res.data.data);
    setIsLoading(true);
  })
}
const approveBooking = async (bookingId) => {
  try {
    await axios({
      method: "PATCH",
      url: `https://rish-shipping-backend-api.vercel.app/admin/api/booking/approve/${bookingId}`,
      data: {
        trackingLink: link,
      },
    });

    await fetchData();
    toast("Successfully approved booking");
  
  } catch (err) {
    toast(err.message);
  }
};
const CompleteBooking = async (bookingId) => {
  try {
    await axios({
      method: "PATCH",
      url: `https://rish-shipping-backend-api.vercel.app/admin/api/booking/status/${bookingId}`,
      data: {
        status: "Completed",
      },
    });

    await fetchData();
    toast("Successfully Completed booking");
  } catch (err) {
    toast(err.message);
  }
};
const PendingBooking = async (bookingId) => {
  try {
    await axios({
      method: "PATCH",
      url: `https://rish-shipping-backend-api.vercel.app/admin/api/booking/status/${bookingId}`,
      data: {
        status: "Pending",
      },
    });

    await fetchData();
    toast("Successfully Updated Status");
  } catch (err) {
    toast(err.message);
  }
};
const cancelBooking = async (bookingId) => {
  try {
    await axios({
      method: "PATCH",
      url: `https://rish-shipping-backend-api.vercel.app/admin/api/booking/status/${bookingId}`,
      data: {
        status: "Cancelled",
      },
    });

    await fetchData();
    toast("Successfully Updated Status");
  } catch (err) {
    toast(err.message);
  }
};
  return (
    <div className="shippers-parent-div">
      {isLoading ? (
        <div className="single-shipper">
          <h1 className="shipper_h1">Booking Details</h1>
          <div className="details_main">
            <div className="details_left" style={{ padding: "50px 20px" }}>
              <div className="d1">
                <p>Client Company</p>
                <p>Shipping Company</p>
                <p>Delivery By</p>
                <p>Item Dimensions</p>
                <p>Booking Cost</p>
                <p>Booking Type</p>
                <p>Goods Type</p>
                <p>Status</p>
                <p>Source Port</p>
                <p>Destination Port</p>
              </div>
              <div className="d2">
                <p>: {bookingData.clientCompany.name}</p>
                <p>: {bookingData.shippingCompany.name}</p>
                <p>: {bookingData.deliveryDateRequired.substring(0, 10)}</p>
                <p>: {bookingData.itemDimensions}</p>
                <p>: &#x20B9; {bookingData.bookingCost}</p>
                <p>: {bookingData.bookingType}</p>
                <p>: {bookingData.goodsType}</p>
                <p>
                  : {bookingData.status}{" "}
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: `${
                        bookingData.status === "Confirmed" ||
                        bookingData.status === "Completed"
                          ? "#5bb318"
                          : "#FDDA0D"
                      }`,
                      display: "inline-block",
                      transform: "translateY(5px)",
                    }}
                  ></div>
                </p>
                <p>: {bookingData.sourcePort.name}</p>
                <p>: {bookingData.destinationPort.name}</p>
              </div>
            </div>
            <div className="details_right">
              <h3>Tracking Details</h3>
              {bookingData.status === "Pending" ||
              bookingData.status === "Cancelled" ? (
                <p style={{ margin: "40px 0" }}>No Tracking Data Available</p>
              ) : (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "80px",
                    }}
                  >
                    <div className="d1">
                      <p>PNR Number</p>
                      <p>Tracking Link</p>
                    </div>
                    <div className="d2">
                      <p>: {bookingData.pnr}</p>
                      <p>
                        :{" "}
                        <a href={`${bookingData.trackingLink}`} target="_blank">
                          {bookingData.trackingLink}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {bookingData.status === "Pending" ? (
                <div>
                  <h3 style={{ marginBottom: "20px" }}>Status Update</h3>
                  <p>Do you want to confirm this booking ?</p>
                  <br></br>
                  <div>
                    <input
                      className="input_link"
                      value={link}
                      name="link"
                      placeholder="Enter the Link"
                    ></input>
                    <div className="confirmation_btns">
                      <button
                        className="yes_btn"
                        onClick={() => approveBooking(bookingId)}
                      >
                        Approve
                      </button>
                      <button
                        className="cancel_btn"
                        onClick={() => cancelBooking(bookingId)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              {bookingData.status === "Confirmed" ? (
                <div>
                  <h3 style={{ marginBottom: "20px" }}>Status Update</h3>
                  <p>Do you want to Update the Status ?</p>
                  <br></br>
                  <div>
                    <div className="confirmation_btns">
                      <button
                        className="yes_btn"
                        onClick={() => CompleteBooking(bookingId)}
                      >
                        Completed
                      </button>
                      <button
                        className="cancel_btn"
                        onClick={() => PendingBooking(bookingId)}
                      >
                        Pending
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SingleBooking;