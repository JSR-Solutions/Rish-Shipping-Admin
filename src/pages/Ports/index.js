import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";

import "./Ports.css";

const Ports = () => {
  const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 8, 91, 1, 2, 2, 3, 1, 4, 56,
  ];
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [ports, setPorts] = useState([]);
  const [show, setShow] = useState(false);

  function addPort() {
    axios
      .post("http://localhost:8000/admin/api/ports", {
        name: name,
        country: country,
      })
      .then((res) => {
        setPorts((e) => [...e, res.data.data]);
        console.log("Port Added");
      });
    handleClose();
  }

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }
  
  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    }
    if (name === "country") {
      setCountry(value);
    }
  }

  return (
    <div className="ports-parent-div">
      <div className="ports-actions-div">
        <div className="search-div">
          <input type="text" placeholder="Search Ports" />
          <button>Search</button>
        </div>
        <div className="sort-div">
          <button>Sort By Name</button>
          <button>Sort By Date Added</button>
          <button>Reload</button>
        </div>
        <div className="add-port-div">
          <button onClick={handleShow}>Add New Port</button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>Add New Port</h3>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <div style={{ padding: "20px" }}>
                <Form.Label>Port Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={name}
                  name="name"
                />
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={country}
                  name="country"
                />

                <div className="add_btn">
                  <button type="button" onClick={() => addPort()}>
                    Add
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
      <div className="ports-list-div">
        <div className="ports-list-header">
          <div>
            <p>Port Name</p>
          </div>
          <div>
            <p>Port Country</p>
          </div>
          <div>
            <p>Date Added</p>
          </div>
          <div>
            <p>Edit</p>
          </div>
          <div>
            <p>Delete</p>
          </div>
        </div>
        <div className="ports-list-items-div">
          {arr.map((a, ind) => {
            return (
              <div
                style={
                  ind % 2 === 0
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "#efefef" }
                }
                className="ports-list-item"
              >
                <div>
                  <p>Hambantota</p>
                </div>
                <div>
                  <p>Sri Lanka</p>
                </div>
                <div>
                  <p>22 Aug, 2022</p>
                </div>
                <div>
                  <button className="port-update-btn">EDIT</button>
                </div>
                <div>
                  <button className="port-delete-btn">DELETE</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ports;
