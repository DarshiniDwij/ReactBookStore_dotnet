import { React, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

const BookModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const imageUrl =;
  // const handleShow = () => setShow(true);

  const handleoffCanvas = () => {
    handleClose();
    props.onHandleCallBack(props.book);
  };

  const handleDelete = () => {
    props.onHandleDeleteCallBack1(props.book);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  // console.log("author");
  // console.log(props.author_name);

  // console.log("genre");
  // console.log(props.genre);

  // console.log("inside modal");
  // console.log(props);

  return (
    <div>
      {props && props.book && (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton style={{ borderButtom: "none" }}>
            {/* <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title> */}
          </Modal.Header>
          <Modal.Body className="grid-example">
            <Container>
              <Row>
                <Col xs={6} md={6}>
                  <img
                    src={`/images/Books/${props.book.title}.png`}
                    alt="testimage"
                    style={{ marginBottom: "30px", height: "400px" }}
                  />
                </Col>
                <Col xs={6} md={6}>
                  <span>
                    <h3>{props.book.title}</h3>
                  </span>
                  <br />
                  <span>
                    <b>Author :</b> {props.author}
                  </span>
                  <br />
                  <span>
                    <b>Genre :</b>
                    {props.genre}
                  </span>
                  <br />
                  <span>
                    <b> Published Date:</b>
                    {formatDate(props.book.publicationDate)}
                  </span>
                  <br />
                  <span>
                    <b> Price:</b>
                    {props.book.price}
                  </span>
                  <br />
                  <span>
                    <b> No Of Book:</b>
                    {props.book.booksPresent}
                  </span>
                  <br />
                  <span>
                    <b> Books sold:</b>
                    {props.book.booksSold}
                  </span>
                  <br />
                  <span>
                    <b> Language:</b>
                    {props.book.language}
                  </span>
                  <br />
                  <span>
                    <b>Description:</b>
                    {props.book.description}
                  </span>
                  <div
                    className="button1-container"
                    style={{ marginTop: "20px" }}
                  >
                    <button
                      className="modal-button"
                      onClick={() => handleoffCanvas()}
                    >
                      UPDATE
                    </button>

                    <button
                      className="modal-button"
                      onClick={() => handleDelete()}
                    >
                      DELETE
                    </button>
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          {/* <ItemOffCanvas
            handleCallBack={props.handleCallBack}
            show={show}
            handleClose={handleClose}
            bookData={currentItem}
          /> */}
        </Modal>
      )}
    </div>
  );
};

export default BookModal;