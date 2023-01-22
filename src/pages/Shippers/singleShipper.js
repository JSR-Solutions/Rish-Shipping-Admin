import React, { useState, useEffect } from "react";
import "./Shippers.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Form } from "react-bootstrap";
import { MdModeEdit, MdDelete, MdEdit } from "react-icons/md";
import RatingsModal from "../../SharedComponents/modal/ratingModal";
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
  const [costModal, setCostModal] = useState(false);
  const [sizeCosts, setSizeCosts] = useState([]);
  const [distanceCosts, setDistanceCosts] = useState([]);
  const [continentCosts, setContinentCosts] = useState([]);
  const [containerCosts, setContainerCosts] = useState([]);
  const [weightCosts, setWeightCosts] = useState([]);
  const [firstField,setFirstField]=useState("");
  const [secondField, setSecondField] = useState("");
  const [costPerUnit, setCostPerUnit] = useState("");
  const [costType,setCostType]=useState("1");
  const [categoryType,setCategoryType]=useState("");
  const [categories,setCategories]=useState([]);
  const [editOpen,setEditOpen]=useState(false);
  const [editId,setEditid]=useState("");
  const [ratingShow,setRatingShow]=useState(false);

  let navigate = useNavigate();
  useEffect(() => {
    fetchData();
    fetchCategory();
  }, [params.shipperId]);

  function fetchData() {
    setSizeCosts([]);
    setDistanceCosts([]);
    setWeightCosts([]);
    setContainerCosts([]);
    setContinentCosts([]);

    axios
      .get(
        `https://rish-shipping-backend-api.vercel.app/admin/api/shippers/${params.shipperId}`
      )
      .then((res) => {
        console.log(res.data);
        setShipperData(res.data.data);
        setSizeCosts([]);
        setDistanceCosts([]);
        setWeightCosts([]);
        setContainerCosts([]);
        setContinentCosts([]);
        res.data.data.costs.forEach(c => {
          if (c.costType === 1) {
            setSizeCosts((e) => [...e, c]);
          }
          if (c.costType === 2) {
            setDistanceCosts((e) => [...e, c]);
          }
          if (c.costType === 3) {
            setContinentCosts((e) => [...e, c]);
          }
          if (c.costType === 4) {
            setContainerCosts((e) => [...e, c]);
          }
          if (c.costType === 5) {
            setWeightCosts((e) => [...e, c]);
          }
        });
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
    setCategoryType("");
    setRatingShow(false);
  }

  async function fetchCategory() {
    const categoriesResponse = await axios.get(
      "https://rish-shipping-backend-api.vercel.app/admin/api/category/all"
    );
    console.log(categoriesResponse.data.data);
    setCategories(categoriesResponse.data.data);
  }

  function handleAddClose() {
    setAddModal(false);
    setAddress("");
    setCompanyName("");
    setEmail("");
    setContact("");
    setWebsite("");
    setCategoryType("");
  }

  function openCost() {
    setCostModal(true);
  }
  function openEditCost(c){
    setCostType(c.costType.toString());
    
    setEditOpen(true);
    setEditid(c.id);
    if(c.firstField){
      setFirstField(c.firstField);
    }
    if(c.secondField){
      setSecondField(c.secondField);
    }
    setCostPerUnit(c.costPerUnit);
     setCostModal(true);
  }

  function closeCost() {
    setCostModal(false);
    setEditOpen(false);
    setFirstField("");
    setSecondField("");
    setCostPerUnit("");
    setCostType("1");
    setCategoryType("");
  }

  function openModal() {
    setAddress(shipperData.address);
    setCompanyName(shipperData.name);
    setEmail(shipperData.email);
    setContact(shipperData.contactNo);
    setWebsite(shipperData.website);
    setCosts(shipperData.costs);
    setCategoryType(shipperData.category.name);
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
          category:categoryType
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
    if(name==="category"){
      setCategoryType(value);
    }
    if (name === "firstField") {
      setFirstField(value);
    }
    if (name === "secondField") {
      setSecondField(value);
    }
    if (name === "costPerUnit") {
      setCostPerUnit(value);
    }
    if(name==="cost"){
      setCostType(value);
    }
    
  }

  function handleAddCost(){
    axios.post(`https://rish-shipping-backend-api.vercel.app/admin/api/cost`,
    {
      shipper:shipperId,
      costType:costType,
      firstField:firstField,
      secondField:secondField,
      costPerUnit:parseInt(costPerUnit)
    }).then((res)=>{
      console.log("Cost Added Successfully");
      closeCost();
      setFirstField("");
      setSecondField("");
      setCostPerUnit("");
      fetchData();
    });

  }
  function editCost(){
     axios
       .patch(
         `https://rish-shipping-backend-api.vercel.app/admin/api/cost/${editId}`,
         {
          costId:editId,
           shipper: shipperId,
           costType: costType,
           firstField: firstField,
           secondField: secondField,
           costPerUnit: parseInt(costPerUnit),
         }
       )
       .then((res) => {
         console.log("Cost Updated Successfully");
          closeCost();
          setFirstField("");
          setSecondField("");
          setCostPerUnit("");
         fetchData();
       });
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
                      <Form.Label>Category Type</Form.Label>
                      <Form.Select name="category" onChange={handleChange}>
                        <option>Select Category</option>
                        {categories.map((a, index) => (
                          <option value={a._id}>{a.name}</option>
                        ))}
                      </Form.Select>
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
              <div style={{display:"flex",position:"relative"}}>
              <div className="d1">
                <p>Name</p>
                <p>Address</p>
                <p>Contact No</p>
                <p>Website</p>
                <p>Email</p>
                <p>Category</p>
              </div>
              <div className="d2">
                <p>: {shipperData.name}</p>
                <p>: {shipperData.address}</p>
                <p>: {shipperData.contactNo}</p>
                <p>: {shipperData.website}</p>
                <p>: {shipperData.email}</p>
                <p>: {shipperData.category.name}</p>
              </div>
              <RatingsModal show={ratingShow} onHide={handleClose} shipper={params.shipperId}/>
              <button className="rating_button" onClick={()=>setRatingShow(true)}>View Ratings</button>
              </div>
            </div>
            <div className="details_right">
              <Modal show={costModal} onHide={closeCost}>
                <Modal.Header closeButton>
                  <h3>{editOpen ? "Edit Cost" : "Add Cost"}</h3>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <Form>
                      {editOpen ? null : (
                        <div>
                          <Form.Label>Cost Type</Form.Label>
                          <Form.Select name="cost" onChange={handleChange}>
                            <option value="1">Size Cost</option>
                            <option value="3">Continent Cost</option>
                            <option value="4">Container Cost</option>
                          </Form.Select>
                        </div>
                      )}

                      {costType === "1" ? (
                        <div>
                          <Form.Label className="mt-3">
                            Minimum Dimension
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={firstField}
                            name="firstField"
                          />
                          <Form.Label className="mt-3">
                            Maximum Dimension
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={secondField}
                            name="secondField"
                          />
                          <Form.Label className="mt-3">
                            Cost Per Unit
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={costPerUnit}
                            name="costPerUnit"
                          />
                        </div>
                      ) : null}
                      {costType === "3" ? (
                        <div>
                          <Form.Label className="mt-3">From</Form.Label>
                          <Form.Select
                            name="firstField"
                            value={firstField}
                            onChange={handleChange}
                          >
                            <option value="Asia">Asia</option>
                            <option value="Africa">Africa</option>
                            <option value="North America">North America</option>
                            <option value="South America">South America</option>
                            <option value="Antartica">Antartica</option>
                            <option value="Europe">Europe</option>
                            <option value="Australia">Australia</option>
                          </Form.Select>
                          <Form.Label className="mt-3">To</Form.Label>
                          <Form.Select
                            name="secondField"
                            value="secondField"
                            onChange={handleChange}
                          >
                            <option value="Asia">Asia</option>
                            <option value="Africa">Africa</option>
                            <option value="North America">North America</option>
                            <option value="South America">South America</option>
                            <option value="Antartica">Antartica</option>
                            <option value="Europe">Europe</option>
                            <option value="Australia">Australia</option>
                          </Form.Select>
                          <Form.Label className="mt-3">
                            Cost Per Unit
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={costPerUnit}
                            name="costPerUnit"
                          />
                        </div>
                      ) : null}
                      {costType === "2" ? (
                        <div>
                          <Form.Label className="mt-3">
                            Cost Per Unit
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={costPerUnit}
                            name="costPerUnit"
                          />
                        </div>
                      ) : null}
                      {costType === "4" ? (
                        <div>
                          <Form.Label className="mt-3">
                            Container Size
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={firstField}
                            name="firstField"
                          />
                          <Form.Label className="mt-3">
                            Cost Per Unit
                          </Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => handleChange(e)}
                            value={costPerUnit}
                            name="costPerUnit"
                          />
                        </div>
                      ) : null}

                      <div className="add_btn">
                        <button
                          type="button"
                          onClick={() =>
                            editOpen ? editCost(editId) : handleAddCost()
                          }
                        >
                          Save
                        </button>
                        <button
                          className="delete_btn"
                          type="button"
                          onClick={() => closeCost()}
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  </div>
                </Modal.Body>
              </Modal>
              <h3>Cost Details</h3>
              <button onClick={openCost} className="addCost_btn">
                Add New Cost
              </button>
              <div className="cost_details">
                {sizeCosts.length > 0 ? (
                  <div>
                    <h6>Size Costs</h6>
                    <div className="table-div">
                      <table>
                        <tr>
                          <th>Minimum Dimension</th>
                          <th>Maximum Dimension</th>
                          <th>Cost Per Unit</th>
                          <th></th>
                        </tr>
                        {sizeCosts.map((c, key) => (
                          <tr>
                            <td>
                              {c.firstField ? <p>{c.firstField}</p> : null}
                            </td>
                            <td>
                              {c.secondField ? <p>{c.secondField}</p> : null}
                            </td>
                            <td>
                              {c.costPerUnit ? <p>{c.costPerUnit}</p> : null}
                            </td>
                            <td>
                              <MdModeEdit
                                onClick={() => openEditCost(c)}
                                className="edit_cost"
                              />
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                ) : null}
                {continentCosts.length > 0 ? (
                  <div style={{ marginTop: "20px" }}>
                    <h6>Continent Costs</h6>
                    <div className="table-div">
                      <table>
                        <tr>
                          <th>From</th>
                          <th>To</th>
                          <th>Cost Per Unit</th>
                          <th></th>
                        </tr>
                        {continentCosts.map((c, key) => (
                          <tr>
                            <td>
                              {c.firstField ? <p>{c.firstField}</p> : null}
                            </td>
                            <td>
                              {c.secondField ? <p>{c.secondField}</p> : null}
                            </td>
                            <td>
                              {c.costPerUnit ? <p>{c.costPerUnit}</p> : null}
                            </td>
                            <td>
                              <MdModeEdit
                                onClick={() => openEditCost(c)}
                                className="edit_cost"
                              />
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                ) : null}
                {distanceCosts.length > 0 ? (
                  <div style={{ marginTop: "20px" }}>
                    <h6>Distance Costs</h6>
                    <div className="table-div">
                      <table>
                        <tr>
                          <th>Cost Per Unit</th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                        {distanceCosts.map((c, key) => (
                          <tr>
                            <td>
                              {c.costPerUnit ? <p>{c.costPerUnit}</p> : null}
                            </td>
                            <td></td>
                            <td></td>
                            <td>
                              <MdModeEdit
                                onClick={() => openEditCost(c)}
                                className="edit_cost"
                              />
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                ) : null}
                {containerCosts.length > 0 ? (
                  <div style={{ marginTop: "20px" }}>
                    <h6>Container Costs</h6>
                    <div className="table-div">
                      <table>
                        <tr>
                          <th>Container Size</th>
                          <th>Cost Per Unit</th>
                          <th></th>
                        </tr>
                        {containerCosts.map((c, key) => (
                          <tr>
                            <td>
                              {c.firstField ? <p>{c.firstField}</p> : null}
                            </td>

                            <td>
                              {c.costPerUnit ? <p>{c.costPerUnit}</p> : null}
                            </td>
                            <td>
                              <MdModeEdit
                                onClick={() => openEditCost(c)}
                                className="edit_cost"
                              />
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                ) : null}
                {/*  {weightCosts.length > 0 ? (
                  <div style={{ marginTop: "20px" }}>
                    <h6>Weight Costs</h6>
                    <div className="table-div">
                      <table>
                        <tr>
                          <th>Cost Per Unit</th>
                          <th></th>
                        </tr>
                        {weightCosts.map((c, key) => (
                          <tr>
                            <td>
                              {c.costPerUnit ? <p>{c.costPerUnit}</p> : null}
                            </td>
                            <td>
                              <MdModeEdit />
                            </td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                        ) : null}*/}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SingleShipper;
