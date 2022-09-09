import React,{useEffect,useState} from "react";
import SideBar from "../../SharedComponents/SideBar";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Dashboard() {
  const arr = [
    1, 2, 3, 4, 5, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  ];
  const [allShippers,setAllShippers]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8000/admin/api/shippers/all").then((res)=>{
      console.log(res.data);
      setAllShippers(res.data.data);
    })
  },[]);
  let navigate=useNavigate();

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
                {arr.map((a, index) => {
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
                      <div>Akash Shipping</div>
                      <div>22 Aug, 2022</div>
                      <div>2 Documents Uploaded</div>
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
              <button onClick={()=>navigate("/shippers")}>VIEW ALL</button>
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
                      <div>{a.createdAt.substring(0,10)}</div>
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
                {arr.map((a, index) => {
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
                      <div>Akash Shipping</div>
                      <div>22 Aug, 2022</div>
                      <div>Hambantota</div>
                      <div>Chicago</div>
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
