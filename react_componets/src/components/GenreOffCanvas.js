import React, { useState } from "react";
import { Offcanvas, Form, Row, Col, OffcanvasBody } from "react-bootstrap";

const GenreOffCanvas = ({
  handleGenreCallBack,
  genreShow,
  handleGenreClose,
}) => {
  const [genre_name, setGenreName] = useState("");
  const [validated, setValidated] = useState(false);

  const [errors, setErrors] = useState({
    genre_name: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!genre_name.trim()) {
      newErrors.genre_name = "Genre Name is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const resetForm = () => {
    setGenreName("");
    setValidated(false);
    setErrors({
      genre_name: "",
    });
  };

  const handleCancel = () => {
    resetForm();
    handleGenreClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      setValidated(true);
      const newGenre = {
        genreName: genre_name,
      };

      try {
        console.log("enter the new");
        // Create new book
        let response = await fetch(
          "https://localhost:7025/api/Genre",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newGenre),
          }
        );
        const data = await response.json();
        handleGenreCallBack(data);
        handleGenreClose();
        resetForm();
      } catch (error) {
        console.error("Error creating Genre ");
      }
    }
  };

  return (
    <div>
      <Offcanvas
        show={genreShow}
        onHide={handleGenreClose}
        placement="end"
        backdrop="static"
        style={{ width: "50vw", zIndex: 1050 }}
      >
        <Offcanvas.Header closeButton style={{ backgroundColor: "#0E345A" }}>
          <Offcanvas.Title style={{ color: "white" }}>
            Add New Genre
          </Offcanvas.Title>
        </Offcanvas.Header>

        <OffcanvasBody>
          <Form
            id="myForm"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="Name">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Genre Name
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Genre Name"
                  value={genre_name}
                  onChange={(e) => setGenreName(e.target.value)}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="text-center" style={{ marginTop: "40px" }}>
                <button className="modal-button mx-2" type="submit">
                  SUBMIT
                </button>
                <button className="modal-button mx-2" onClick={handleCancel}>
                  CANCEL
                </button>
              </div>
            </Row>
          </Form>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default GenreOffCanvas;
