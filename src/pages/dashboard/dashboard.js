import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";

import "./dashboard.css";

function ViewCompanyDetailsModal(props) {
  const { company, fetchData } = props;

  useEffect(() => {}, [props]);

  const verifyCompany = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        method: "PATCH",
        url: "https://rish-shipping-backend-api.vercel.app/admin/api/company/toggle-verification",
        data: {
          companyId: company && company._id,
          verificationStatus: true,
        },
      });
      if (response.status) {
        fetchData();
        props.onHide();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {company && company.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <center>
          <h4>Company Details</h4>
        </center>
        <br />
        <Row>
          <Col>
            <h5>Basic Info</h5>
            <br />
            <Row>
              <Col lg={5}>Name : </Col>
              <Col>
                <b>{company && company.name}</b>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>Email : </Col>
              <Col>
                <b>{company && company.email}</b>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>Type : </Col>
              <Col>
                <b>{company && company.businessType}</b>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>Registration Date : </Col>
              <Col>
                <b>{company && company.createdAt.substring(0, 10)}</b>
              </Col>
            </Row>
          </Col>
          <Col>
            <h5>Documents</h5>
            <br />
            {company &&
              company.documents &&
              company.documents.map((doc) => {
                return (
                  <Row>
                    <Col lg={9}>{doc.name}</Col>
                    <Col>
                      <a href={doc.url}>
                        <BsDownload />
                      </a>
                    </Col>
                  </Row>
                );
              })}
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={verifyCompany} className="modal-verify-btn">
          Verify
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Dashboard() {
  const [allShippers, setAllShippers] = useState([]);
  const [unverifiedCompanies, setUnverifiedCompanies] = useState([]);
  const [bookingRequests, setBookingRequests] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const shippersResponse = await axios.get(
        "https://rish-shipping-backend-api.vercel.app/admin/api/shippers/all"
      );
      setAllShippers(shippersResponse.data.data);

      const unverifiedCompanyResponse = await axios.get(
        "https://rish-shipping-backend-api.vercel.app/admin/api/company/unverified"
      );
      setUnverifiedCompanies(unverifiedCompanyResponse.data.data);

      const bookingResponse = await axios({
        method: "POST",
        url: "https://rish-shipping-backend-api.vercel.app/admin/api/booking/",
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
      <ViewCompanyDetailsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        company={selectedCompany}
        fetchData={fetchData}
      />
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
                  <p>View Details</p>
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
                      <div>{company.documents.length} Documents</div>
                      <div>
                        <button
                          onClick={() => {
                            setSelectedCompany(company);
                            setModalShow(true);
                          }}
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
