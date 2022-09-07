import React from "react";
import "./Shippers.css";
const Shippers = () => {
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 8, 91, 1, 2, 2, 3, 1, 4, 56,
  ];

  return (
    <div className="shippers-parent-div">
      <div className="shippers-actions-div">
        <div className="search-div">
          <input type="text" placeholder="Search Shippers" />
          <button>Search</button>
        </div>
        <div className="sort-div">
          <button>Sort By Name</button>
          <button>Sort By Date Added</button>
          <button>Reload</button>
        </div>
        <div className="add-shipper-div">
          <button>Add New Shipper</button>
        </div>
      </div>
      <div className="shippers-list-div">
        <div className="shippers-list-header">
          <div>
            <p>Shipper Name</p>
          </div>
          <div>
            <p>Bookings</p>
          </div>
          <div>
            <p>Email</p>
          </div>
          <div>
            <p>View</p>
          </div>
        </div>
        <div className="shippers-list-items-div">
          {arr.map((a, ind) => {
            return (
              <div
                style={
                  ind % 2 === 0
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "#efefef" }
                }
                className="shippers-list-item"
              >
                <div>
                  <p>Hambantota</p>
                </div>
                <div>
                  <p>Sri Lanka</p>
                </div>
                <div>
                  <p>akash@shipping.com</p>
                </div>
                <div>
                  <button className="shipper-view-btn">VIEW</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shippers;
