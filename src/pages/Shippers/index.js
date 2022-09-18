import React, { useEffect, useState } from "react";
import "./Shippers.css";
import axios from "axios";
import { Modal, Form } from "react-bootstrap";
const Shippers = () => {
  const [allShippers, setAllShippers] = useState([]);
  const [show, setShow] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [addModal, setAddModal] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:8000/admin/api/shippers/all").then((res) => {
      console.log(res.data);
      setAllShippers(res.data.data);
    });
  }, []);

  function handleClose() {
    setShow(false);
    setAddress("");
    setCompanyName("");
    setEmail("");
    setContact("");
    setWebsite("");
  }

  function handleAddClose() {
    setAddModal(false);
    setAddress("");
    setCompanyName("");
    setEmail("");
    setContact("");
    setWebsite("");
  }

  function openModal(a) {
    setAddress(a.address);
    setCompanyName(a.name);
    setEmail(a.email);
    setContact(a.contactNo);
    setWebsite(a.website);
    setShow(true);
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "companyName") {
      setCompanyName(value);
    }
    if (name === "contact") {
      setContact(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "address") {
      setAddress(value);
    }
    if (name === "website") {
      setWebsite(value);
    }
  }

  function addShipper() {
    axios
      .post(`http://localhost:8000/admin/api/shippers/`, {
        website: website,
        contactNo: contact,
        address: address,
        email: email,
        name: companyName,
      })
      .then((res) => {
        setAllShippers((e) => [...e, res.data.data]);
        console.log("New Shipper Added");
      });
    handleAddClose();
  }

  function EditShipper(id) {
    axios
      .patch(`http://localhost:8000/admin/api/shippers/`, {
        website: website,
        contactNo: contact,
        address: address,
        email: email,
        name: companyName,
        shipperId: id,
      })
      .then((res) => {
        console.log("Shipper Updated Successfully");
        if (res.data) {
          let temparr = [...allShippers];
          let updateIndex = temparr.findIndex((abc) => abc.id === id);
          temparr[updateIndex] = res.data.data;
          setAllShippers(temparr);
        }
      });
    handleClose();
  }

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
          <button onClick={() => setAddModal(true)}>Add New Shipper</button>
        </div>
      </div>
      <Modal show={addModal} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <h3>Add New Shipper</h3>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <div style={{ padding: "20px" }}>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={companyName}
                  name="companyName"
                />
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={email}
                  name="email"
                />
                <Form.Label>Contact No.</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={contact}
                  name="contact"
                />
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={address}
                  name="address"
                />
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={website}
                  name="website"
                />
                <div className="add_btn">
                  <button type="button" onClick={() => addShipper()}>
                    Add
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
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
          {allShippers.map((a, ind) => {
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
                  <p>{a.name}</p>
                </div>
                <div>
                  <p>{a.address}</p>
                </div>
                <div>
                  <p>{a.email}</p>
                </div>
                <div>
                  <button
                    onClick={() => openModal(a)}
                    className="shipper-view-btn"
                  >
                    VIEW
                  </button>
                </div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <h3>Edit Details</h3>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <Form>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => handleChange(e)}
                          value={companyName}
                          name="companyName"
                        />
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => handleChange(e)}
                          value={email}
                          name="email"
                        />
                        <Form.Label>Contact No.</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => handleChange(e)}
                          value={contact}
                          name="contact"
                        />
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => handleChange(e)}
                          value={address}
                          name="address"
                        />
                        <Form.Label>Website</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => handleChange(e)}
                          value={website}
                          name="website"
                        />
                        <div className="add_btn">
                          <button
                            type="button"
                            onClick={() => EditShipper(a.id)}
                          >
                            Edit
                          </button>
                        </div>
                      </Form>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shippers;
