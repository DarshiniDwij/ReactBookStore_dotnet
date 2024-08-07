import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import AuthorOffCanvas from "./AuthorOffCanvas";

const AuthorCard = ({ author, onHandleDeleteCallBack, handleCallBack }) => {
  const [showFooter, setShowFooter] = useState(false);
  const [show, setShow] = useState(false);
  const imageUrl = `/images/Authors/${author.name}.png`;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleMouseEnter = () => {
    setShowFooter(true);
  };

  const handleMouseLeave = () => {
    setShowFooter(false);
  };

  // const handleView = () => {
  //   // Implement view functionality
  //   console.log("View clicked");
  // };

  const handleEdit = () => {
    handleShow();
    // handleCallBack(author);
  };

  const handleDelete = () => {
    // Implement delete functionality
    console.log("Delete clicked");
    console.log(author.name)
    onHandleDeleteCallBack(author);
  };

  // const handleAuthor = () => {
  //   window.location.href = `/singleAuthor/${author}`;
  // };
  return (
    <div style={{ height: "16rem" }}>
      {author && (
        <Card
          style={{
            width: "12rem",
            border: "none",
            borderRadius: "0 !important",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Card.Img variant="top" src={imageUrl} />
          <Card.Body>
            <Card.Title className="auth-card-title">{author.name}</Card.Title>
          </Card.Body>

          {showFooter && (
            <Card.Footer
              className="text-center"
              style={{ backgroundColor: "#0E345A" }}
            >
              {/* <Link to={`/singleAuthor/${author.id}`} state={author}> */}
              {/* <Button
                  className="w-100 custom-borderless-btn"
                  style={{ backgroundColor: "#0E345A", border: "none" }}
                >
                  View Details
                </Button> */}

              <div className="icon-button">
                <div className="icon-section">
                  <Link to={`/singleAuthor/${author.id}`} state={author}>
                    <AiOutlineEye className="icon" />
                  </Link>
                </div>
                <div className="icon-section" onClick={handleEdit}>
                  <AiOutlineEdit className="icon" />
                </div>
                <div className="icon-section" onClick={handleDelete}>
                  <AiOutlineDelete className="icon" />
                </div>
              </div>
            </Card.Footer>
          )}
        </Card>
      )}
      {show && (
        <AuthorOffCanvas
          handleCallBack={handleCallBack}
          show={show}
          handleClose={handleClose}
          authorData={author}
        ></AuthorOffCanvas>
      )}
    </div>
  );
};

export default AuthorCard;
