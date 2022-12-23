import axios from "axios";
import React, { useEffect,useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";
import "./Companies.css";

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


const Company = () => {
  
  const [companies,setCompanies]=useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState();

  useEffect(()=>{

    fetchData();

  },[]);
   
  const fetchData=()=>{
    axios
      .get(
        "https://rish-shipping-backend-api.vercel.app/admin/api/company/all-business"
      )
      .then((res) => {
        setCompanies(res.data.data);
        console.log(res.data.data);
      });
  }

   
  return (
    <div className="companys-parent-div">
      <ViewCompanyDetailsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        company={selectedCompany}
        fetchData={fetchData}
      />
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
          {companies.map((a, ind) => {
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
                  <p>{a.name}</p>
                </div>
                <div>
                  <p>0 bookings</p>
                </div>
                <div>
                  <p>{a.isVerified ? `Verified` : `Unverified`}</p>
                </div>
                <div>
                  <p>{a.documents.length} Documents Uploaded</p>
                </div>
                <div>
                  <button
                    className="company-view-btn"
                    onClick={() => {
                      setSelectedCompany(a);
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
  );
};

export default Company;
