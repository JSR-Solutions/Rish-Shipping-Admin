import React, { useEffect, useState } from "react";
import "./Shippers.css";
import axios from "axios";
import { Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Shippers = () => {
  const [allShippers, setAllShippers] = useState([]);
  const [shippers, setShippers] = useState([]);
  const [show, setShow] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [searchVal, setSearchVal] = useState("");

  const [categoryType,setCategoryType]=useState("");
  const [costs,setCosts]=useState();

  const [isSortedByDate, setIsSortedByDate] = useState(false);
  const [isSortedByName, setIsSortedByName] = useState(false);
  const [website, setWebsite] = useState("");
  const [categories,setCategories]=useState([]);
  const [reload, setReload] = useState(false);
  const [query, setQuery] = useState("");
  const [addModal, setAddModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    axios.get("https://rish-shipping-backend-api.vercel.app/admin/api/shippers/all").then((res) => {
      console.log(res.data);
      setAllShippers(res.data.data);
      setShippers(res.data.data);
    });
    fetchCategory();

  }, [reload]);

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
    setCategoryType("");
    setWebsite("");
  }

  function openModal(a) {
    setAddress(a.address);
    setCompanyName(a.name);
    setEmail(a.email);
    setContact(a.contactNo);
    setWebsite(a.website);
    setCosts(a.costs);
    
    setShow(true);
  }
   async function fetchCategory() {
     const categoriesResponse = await axios.get(
       "https://rish-shipping-backend-api.vercel.app/admin/api/category/all"
     );
     console.log(categoriesResponse.data.data);
     setCategories(categoriesResponse.data.data);
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
    if (name === "search") {
      setSearchVal(value);
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
    if(name==="category"){
      setCategoryType(value);
    }
  }

  function sortByName(e) {
    e.preventDefault();
    console.log("sorting");
    let temparr = [...allShippers];
    temparr.sort((a, b) =>
      isSortedByName
        ? b.name.toString().localeCompare(a.name.toString())
        : a.name.toString().localeCompare(b.name.toString())
    );
    setAllShippers(temparr);
    setIsSortedByName(!isSortedByName);
  }

  function sortByDate(e) {
    e.preventDefault();
    console.log("sorting");
    let temparr = [...allShippers];
    temparr.sort((a, b) =>
      isSortedByDate
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );
    setIsSortedByDate(!isSortedByDate);
    setAllShippers(temparr);
  }

  function addShipper() {
    axios

      .post(`https://rish-shipping-backend-api.vercel.app/admin/api/shippers/`, {
        website: website,
        contactNo: contact,
        address: address,
        email: email,
        name: companyName,
        category:categoryType,
      })

      .then((res) => {
        setAllShippers((e) => [...e, res.data.data]);
        console.log("New Shipper Added");
      });
    handleAddClose();
  }

  const searchBookings = (e) => {
    const filtered = [];
    for (const shipper of shippers) {
      if (shipper.name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(shipper);
      }
    }

    setAllShippers(filtered);
  };

  return (
    <div className="shippers-parent-div">
      <div className="shippers-actions-div">
        <div className="search-div">
          <input
            type="text"
            placeholder="Search Shippers"
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value === "") setAllShippers(shippers);
            }}
            name="search"
            value={query}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                searchBookings();
              }
            }}
          />
          <button>Search</button>
        </div>
        <div className="sort-div">
          <button onClick={(e) => sortByName(e)}>Sort By Name</button>
          <button onClick={(e) => sortByDate(e)}>Sort By Date Added</button>
          <button onClick={() => setReload(!reload)}>Reload</button>
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
            <div>
              <Form>
                <div style={{ padding: "20px" }}>
                  <Form.Label>Category Type</Form.Label>
                  <Form.Select name="category" onChange={handleChange}>
                    {categories.map((a, index) => (
                      <option value={a._id}>{a.name}</option>
                    ))}
                  </Form.Select>
                  <Form.Label className="mt-2">Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={companyName}
                    name="companyName"
                  />
                  <Form.Label className="mt-2">Email</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={email}
                    name="email"
                  />
                  <Form.Label className="mt-2">Contact No.</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={contact}
                    name="contact"
                  />
                  <Form.Label className="mt-2">Address</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={address}
                    name="address"
                  />
                  <Form.Label className="mt-2">Website</Form.Label>
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
            <div></div>
            <div className="costs-div"></div>
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
                    onClick={() => navigate(`/shippers/${a.id}`)}
                    className="shipper-view-btn"
                  >
                    VIEW
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

export default Shippers;
