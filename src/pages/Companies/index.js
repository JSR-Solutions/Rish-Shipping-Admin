import axios from "axios";
import React, { useEffect,useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import { BsDownload } from "react-icons/bs";
import Loader from "../../SharedComponents/loader/loader";
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
  const [allCompanies,setAllCompanies]=useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState();
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [isSortedByDate, setIsSortedByDate] = useState(false);
  const [isSortedByName, setIsSortedByName] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(()=>{

    fetchData();
     setQuery("");
  },[reload]);
   
  const fetchData=()=>{
    axios
      .get(
        "https://rish-shipping-backend-api.vercel.app/admin/api/company/all-business"
      )
      .then((res) => {
        setCompanies(res.data.data);
        setAllCompanies(res.data.data);
        setLoaded(true);
        console.log(res.data.data);
      });
  }

  const searchCompanies = (e) => {
    const filteredBookings = [];
    for (const company of allCompanies) {
      if (
        company.name.toLowerCase().includes(query.toLowerCase())
      ) {
        filteredBookings.push(company);
      }
    }

    setCompanies(filteredBookings);
  };

   function sortByName(e) {
     e.preventDefault();
     console.log("sorting");
     let temparr = [...companies];
     temparr.sort((a, b) =>
       isSortedByName
         ? b.name.toString().localeCompare(a.name.toString())
         : a.name.toString().localeCompare(b.name.toString())
     );
     setCompanies(temparr);
     setIsSortedByName(!isSortedByName);
   }

   function sortByDate(e) {
     e.preventDefault();
     console.log("sorting");
     let temparr = [...companies];
     temparr.sort((a, b) =>
       isSortedByDate
         ? new Date(a.createdAt) - new Date(b.createdAt)
         : new Date(b.createdAt) - new Date(a.createdAt)
     );
     setIsSortedByDate(!isSortedByDate);
     setCompanies(temparr);
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
          <input
            type="text"
            placeholder="Search Companies"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value === "") {
                setCompanies(allCompanies);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                searchCompanies();
              }
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              searchCompanies(e);
            }}
          >
            Search
          </button>
        </div>
        <div className="sort-div">
          <button onClick={(e) => sortByName(e)}>Sort By Name</button>
          <button onClick={(e) => sortByDate(e)}>Sort By Date Added</button>
          <button onClick={() => setReload(!reload)}>Reload</button>
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
          {loaded ? (
            <>
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
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Company;
