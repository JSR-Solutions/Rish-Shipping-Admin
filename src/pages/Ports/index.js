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
  const [editName, setEditName] = useState("");
  const [editCountry, setEditCountry] = useState("");
  const [editPort,setEditPort]=useState({});
  const [ports, setPorts] = useState([]);
  const [show, setShow] = useState(false);
  const [editShow,setEditShow]=useState(false);
  const [isSortedByDate, setIsSortedByDate] = useState(false);
  const [isSortedByName, setIsSortedByName] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
   axios.get("http://localhost:8000/admin/api/ports").then((res)=>{
    setPorts(res.data.data);
    console.log(res.data.data);
   });
  
    
  }, [reload]);
  

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

  function handleEditShow(p){
    setEditShow(true);
    setEditPort(p);
    setEditCountry(p.country);
    setEditName(p.name);
  }

  function handleClose() {
    setShow(false);
    setEditShow(false);
    setCountry("");
    setEditCountry("");
    setName("");
    setEditName("");
    setEditPort({});
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
    if(name==="editcountry"){
      setEditCountry(value);
    }
    if(name==="editname"){
      setEditName(value);
    }
  }

  function handleEditPort(){
    
    let id=editPort.id;
    console.log(id);
    axios.patch(`http://localhost:8000/admin/api/ports/${id}`,{
      country:editCountry,
      name:editName
    }).then((res)=>{
      if(res.data){
        let tempports=[...ports];
        let updateIndex=tempports.findIndex((a)=>a.id===id);
        tempports[updateIndex]=res.data.data;
        setPorts(tempports);
      }
      handleClose();
    });
  }

  function handleDeletePort(port){
    let id=port.id;
    axios
      .delete(`http://localhost:8000/admin/api/ports/${id}`)
      .then((res) => {
        console.log("Port deleted");
        let b =ports.findIndex((a) => a.id === id);
        var temparr = [...ports];
        temparr.splice(b, 1);
        setPorts(temparr);
        handleClose();
      });
  }

  function sortByName(e) {
    e.preventDefault();
    console.log("sorting");
    let temparr = [...ports];
    temparr.sort((a, b) =>
      isSortedByName
        ? b.name.toString().localeCompare(a.name.toString())
        : a.name.toString().localeCompare(b.name.toString())
    );
    setPorts(temparr);
    setIsSortedByName(!isSortedByName);
  }

  function sortByDate(e) {
    e.preventDefault();
    console.log("sorting");
    let temparr = [...ports];
    temparr.sort((a, b) =>
      isSortedByDate
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );
    setIsSortedByDate(!isSortedByDate);
    setPorts(temparr);
  }

  return (
    <div className="ports-parent-div">
      <div className="ports-actions-div">
        <div className="search-div">
          <input type="text" placeholder="Search Ports" />
          <button>Search</button>
        </div>
        <div className="sort-div">
          <button onClick={(e) => sortByName(e)}>Sort By Name</button>
          <button onClick={(e) => sortByDate(e)}>Sort By Date Added</button>
          <button onClick={() => setReload(!reload)}>Reload</button>
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
         
          {ports.map((port, ind) => {
            return (
              <div
                style={
                  ind % 2 === 0
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "#efefef" }
                }
                className="ports-list-item"
              >
                <Modal show={editShow} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <h3>Edit Details</h3>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      <Form>
                        <Form.Label>Port Name</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => handleChange(e)}
                          value={editName}
                          name="editname"
                        />
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => handleChange(e)}
                          value={editCountry}
                          name="editcountry"
                        />
                        <div className="add_btn">
                          <button
                            type="button"
                            onClick={() => handleEditPort(port)}
                          >
                            Save
                          </button>
                          <button className="delete_btn" type="button">
                            Delete
                          </button>
                        </div>
                      </Form>
                    </div>
                  </Modal.Body>
                </Modal>
                <div>
                  <p>{port.name}</p>
                </div>
                <div>
                  <p>{port.country}</p>
                </div>
                <div>
                  <p>{port.createdAt.substring(0, 10)}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleEditShow(port)}
                    className="port-update-btn"
                  >
                    EDIT
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => handleDeletePort(port)}
                    className="port-delete-btn"
                  >
                    DELETE
                  </button>
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
