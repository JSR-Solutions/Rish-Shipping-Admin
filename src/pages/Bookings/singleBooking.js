import React,{useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";


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
                      backgroundColor: `${bookingData.status==="Confirmed"?"lightgreen":"#FDDA0D"}`,
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
                    : <a href={`${bookingData.trackingLink}`} target="_blank">{bookingData.trackingLink}</a>
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