import React,{useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Form } from "react-bootstrap";

function SingleBooking(props) {
  
 const params = useParams();
 const [bookingId, setBookingId] = useState(params.bookingId);
const [bookingData, setBookingData] = useState({});
const [isLoading, setIsLoading] = useState(true);
const [link,setLink]=useState("");
const fetchData=()=>{
  axios.get(`https://rish-shipping-backend-api.vercel.app/admin/api/bookings/${params.bookingId}`)
  .then((res)=>{
    setBookingData(res.data);
  })
}
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
                <p>: Chitransh</p>
                <p>: California (IN to US) Shippers</p>
                <p>: 12-01-2023</p>
                <p>: 200</p>
                <p>: &#x20B9; 44936</p>
                <p>: Container</p>
                <p>: Aaltu</p>
                <p>
                  : Pending{" "}
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#FDDA0D",
                      display: "inline-block",
                      transform:"translateY(5px)"
                    }}
                  ></div>
                </p>
                <p>: Agra</p>
                <p>: Ludhiana</p>
              </div>
            </div>
            <div className="details_right">
              <h3>Tracking Details</h3>
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
                  <p>: CAL-W3uZqjAW5</p>
                  <p>
                    : <a href="www.google.com">www.google.com</a>
                  </p>
                </div>
              </div>
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
                  <button className="yes_btn">Approve</button>
                  <button className="cancel_btn">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SingleBooking;