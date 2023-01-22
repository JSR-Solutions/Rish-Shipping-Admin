import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./RatingModal.css";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import moment from "moment";

const MyVerticallyCenteredModal = (props) => {
  // const [ratings, setRatings] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // setRatings([]);
    setReviews([]);

    axios
      .get(
        `https://rish-shipping-backend-api.vercel.app/api/rating/shipper/${props.shipper}`
      )
      .then((res) => {
        console.log(res.data.data);
        setReviews(res.data.data);
      })
      .catch((err) => console.error(err));

    // axios
    //   .get(
    //     `https://rish-shipping-backend-api.vercel.app/api/rating/shipper-rating/${props.shipper}`
    //   )
    //   .then((res) => {
    //     setRatings(res.data.data);
    //   })
    //   .catch((err) => console.error(err));
  }, [props.shipper]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Rating and Reviews
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {reviews &&
          reviews.map((review, index) => {
            console.log(review);
            return (
              <div className={`${index !== 0 ? "ratings-gog" : "rate"}`}>
                <div className="ratings-god">
                  <div className="ratings-top">
                    <div>
                      {review.companyId && review.companyId.name}
                      <span className="datetime">
                        on &nbsp;
                        {moment(review.createdAt).format(
                          "DD-MMM-YYYY - hh:mm A"
                        )}
                      </span>
                    </div>
                    <div className="rater">
                      <Rater
                        total={5}
                        rating={review.rating}
                        interactive={false}
                      />
                    </div>
                  </div>
                  <div className="ratings-bot">{review.review}</div>
                </div>
              </div>
            );
          })}
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            backgroundColor: "#283046",
            outline: "none",
            border: "none",
          }}
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default MyVerticallyCenteredModal;
