import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Dashboard() {
  const arr = [
    1, 2, 3, 4, 5, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  const [allShippers, setAllShippers] = useState([]);
  const [unverifiedCompanies, setUnverifiedCompanies] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const shippersResponse = await axios.get(
        "http://localhost:8000/admin/api/shippers/all"
      );
      setAllShippers(shippersResponse.data.data);

      const unverifiedCompanyResponse = await axios.get(
        "http://localhost:8000/admin/api/company/unverified"
      );
      setUnverifiedCompanies(unverifiedCompanyResponse.data.data);

      const bookingResponse = await axios({
        method: "POST",
        url: "http://localhost:8000/admin/api/booking/",
        data: {
          status: "Pending",
        },
      });
      setBookingRequests(bookingResponse.data.data);
    } catch (error) {
      console.log(`ERROR : ${JSON.stringify(error)}`);
    }
  };

  let navigate = useNavigate();

  return (
    <div className="dashboard-main">
      <div className="dashboard-content">
        <div className="dashboard-row-one">
          <div className="dashboard-shippers-div">
            <div className="header-div">
              <h3>New Onboarding Requests</h3>
              <button>VIEW ALL</button>
            </div>
            <div className="content-div">
              <div className="content-header">
                <div>
                  <p>Company Name</p>
                </div>
                <div>
                  <p>Request Date</p>
                </div>
                <div>
                  <p>Document Status</p>
                </div>
                <div>
                  <p>Verify</p>
                </div>
              </div>
              <div className="content-items">
                {unverifiedCompanies.map((company, index) => {
                  return (
                    <div
                      key={index}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: "white" }
                          : { backgroundColor: "#efefef" }
                      }
                      className="content-item"
                    >
                      <div>{company.name}</div>
                      <div>{company.createdAt.substring(0, 10)}</div>
                      <div>{company.documents.length} Documents Uploaded</div>
                      <div>
                        <button>VERIFY</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="dashboard-companies-div">
            <div className="header-div">
              <h3>All Shippers</h3>
              <button onClick={() => navigate("/shippers")}>VIEW ALL</button>
            </div>
            <div className="content-div">
              <div className="content-header">
                <div>
                  <p>Shipper Name</p>
                </div>
                <div>
                  <p>Onboarding Date</p>
                </div>
                <div>
                  <p>Bookings Received</p>
                </div>
                <div>
                  <p>View Bookings</p>
                </div>
              </div>
              <div className="content-items">
                {allShippers.map((a, index) => {
                  return (
                    <div
                      key={index}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: "white" }
                          : { backgroundColor: "#efefef" }
                      }
                      className="content-item"
                    >
                      <div>{a.name}</div>
                      <div>{a.createdAt.substring(0, 10)}</div>
                      <div>33</div>
                      <div>
                        <button>VIEW</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-row-two">
          <div className="dashboard-bookings-div">
            <div className="header-div">
              <h3>New Booking Requests</h3>
              <button>VIEW ALL</button>
            </div>
            <div className="content-div">
              <div className="content-header">
                <div>
                  <p>Company Name</p>
                </div>
                <div>
                  <p>Request Date</p>
                </div>
                <div>
                  <p>Source Port</p>
                </div>
                <div>
                  <p>Destination Port</p>
                </div>
                <div>
                  <p>View Request</p>
                </div>
              </div>
              <div className="content-items">
                {bookingRequests.map((bookingRequest, index) => {
                  return (
                    <div
                      key={index}
                      style={
                        index % 2 === 0
                          ? { backgroundColor: "white" }
                          : { backgroundColor: "#efefef" }
                      }
                      className="content-item"
                    >
                      <div>{bookingRequest.clientCompany.name}</div>
                      <div>{bookingRequest.createdAt.substring(0, 10)}</div>
                      <div>
                        {bookingRequest.sourcePort.name},{" "}
                        {bookingRequest.sourcePort.country}
                      </div>
                      <div>
                        {bookingRequest.destinationPort.name},{" "}
                        {bookingRequest.destinationPort.country}
                      </div>
                      <div>
                        <button>VIEW</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
