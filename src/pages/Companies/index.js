import axios from "axios";
import React, { useEffect,useState } from "react";
import "./Companies.css";

const Company = () => {
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 8, 91, 1, 2, 2, 3, 1, 4, 56,
  ];
  const [companies,setCompanies]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8000/admin/api/company/all-business").then((res)=>{
      setCompanies(res.data.data);
      console.log(res.data.data);
    });
  })
  return (
    <div className="companys-parent-div">
      <div className="companys-actions-div">
        <div className="search-div">
          <input type="text" placeholder="Search Companies" />
          <button>Search</button>
        </div>
        <div className="sort-div">
          <button>Sort By Name</button>
          <button>Sort By Date Added</button>
          <button>Reload</button>
        </div>
      </div>
      <div className="companys-list-div">
        <div className="companys-list-header">
          <div>
            <p>Company Name</p>
          </div>
          <div>
            <p>Bookings</p>
          </div>
          <div>
            <p>Verification Status</p>
          </div>
          <div>
            <p>Document Status</p>
          </div>
          <div>
            <p>View</p>
          </div>
        </div>
        <div className="companys-list-items-div">
          {arr.map((a, ind) => {
            return (
              <div
                style={
                  ind % 2 === 0
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "#efefef" }
                }
                className="companys-list-item"
              >
                <div>
                  <p>Surat Textiles</p>
                </div>
                <div>
                  <p>0 bookings</p>
                </div>
                <div>
                  <p>Unverified</p>
                </div>
                <div>
                  <p>2 Documents Uploaded</p>
                </div>
                <div>
                  <button className="company-view-btn">VIEW</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Company;
