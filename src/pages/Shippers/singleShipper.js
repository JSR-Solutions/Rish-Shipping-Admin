import React, { useState, useEffect } from "react";
import "./Shippers.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Form } from "react-bootstrap";
import { MdModeEdit, MdDelete } from "react-icons/md";
function SingleShipper(props) {
  const params = useParams();
  const [shipperId, setShipperId] = useState(params.shipperId);
  const [shipperData, setShipperData] = useState({});
  const [show, setShow] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [costs, setCosts] = useState();
  const [addModal, setAddModal] = useState(false);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [costModal,setCostModal]=useState(false);

  const costNames = [
    "Size Cost",
    "Distance Cost",
    "Continent Cost",
    "Container Cost",
    "Weight Cost",
  ];
  let navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [params.shipperId]);

  function fetchData() {
    axios
      .get(
        `https://rish-shipping-backend-api.vercel.app/admin/api/shippers/${params.shipperId}`
      )
      .then((res) => {
        console.log(res.data);
        setShipperData(res.data.data);
        setIsLoading(true);
      });
  }
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

  function openCost(){
    setCostModal(true);
  }
  function closeCost() {
    setCostModal(false);
  }

  function openModal() {
    setAddress(shipperData.address);
    setCompanyName(shipperData.name);
    setEmail(shipperData.email);
    setContact(shipperData.contactNo);
    setWebsite(shipperData.website);
    setCosts(shipperData.costs);
    setShow(true);
  }

  function DeleteShipper(id) {
    console.log(id);
    axios
      .delete(
        "https://rish-shipping-backend-api.vercel.app/admin/api/shippers/",
        {
          data: {
            shipperId: id,
          },
        }
      )
      .then((res) => {
        console.log("Shipper deleted");
        navigate("/shippers");
        handleClose();
      });
  }
  function EditShipper(id) {
    axios
      .patch(
        `https://rish-shipping-backend-api.vercel.app/admin/api/shippers/`,
        {
          website: website,
          contactNo: contact,
          address: address,
          email: email,
          name: companyName,
          shipperId: id,
        }
      )
      .then((res) => {
        console.log("Shipper Updated Successfully");
        fetchData();
      });
    handleClose();
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

  return (
    <div className="shippers-parent-div">
      {isLoading ? (
        <div className="single-shipper">
          <h1 className="shipper_h1">{shipperData.name}</h1>
          <div className="details_main">
            <div className="details_left">
              <MdModeEdit onClick={openModal} className="shipper_edit" />
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
                          onClick={() => EditShipper(shipperData.id)}
                        >
                          Save
                        </button>
                        <button
                          className="delete_btn"
                          type="button"
                          onClick={() => DeleteShipper(shipperData.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </Form>
                  </div>
                </Modal.Body>
              </Modal>
              <h3> Shipper Details</h3>
              <div className="d1">
                <p>Name</p>
                <p>Address</p>
                <p>Contact No</p>
                <p>Website</p>
                <p>Email</p>
              </div>
              <div className="d2">
                <p>: {shipperData.name}</p>
                <p>: {shipperData.address}</p>
                <p>: {shipperData.contactNo}</p>
                <p>: {shipperData.website}</p>
                <p>:{shipperData.email}</p>
              </div>
            </div>
            <div className="details_right">
              <h3>Cost Details</h3>
              <button className="addCost_btn">Add New Cost</button>
              <div className="cost_details">
                {shipperData &&
                  shipperData.costs.length > 0 &&
                  shipperData.costs.map((c, key) => (
                    <div className="cost_div">
                    <MdDelete className="delete-icon"></MdDelete>
                      <h5>Cost Type: {costNames[c.costType - 1]}</h5>
                      <div style={{display:"flex"}}>
                      {c.firstField ? <p>First Field: {c.firstField}</p> : null}
                      {c.secondField ? (
                        <p>Second Field: {c.secondField}</p>
                      ) : null}
                      {c.costPerUnit ? (
                        <p>Cost Per unit: {c.costPerUnit}</p>
                      ) : null}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div> 
      ) : null}
    </div>
  );
}

export default SingleShipper;
