import React, { useEffect, useState } from "react";
import { Offcanvas, Form, Row, Col, OffcanvasBody } from "react-bootstrap";

const AuthorOffCanvas = ({ handleCallBack, show, handleClose, authorData }) => {
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [id, setId] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    biography: "",
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (authorData) {
      console.log(authorData.biography);
      setId(authorData.authorId || "");
      setName(authorData.name || "");
      setBiography(authorData.biography || "");
    }
  }, [authorData]);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.title = "Name is required";
      valid = false;
    }
    if (!biography.trim()) {
      newErrors.title = "Bio is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const resetForm = () => {
    setName("");
    setBiography("");
    setErrors({
      name: "",
      biography: "",
    });
  };

  const handleCancel = () => {
    resetForm();
    handleClose();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      setValidated(true);
      console.log("Author id is:" + id);
      const newAuthor = {
        authorId: authorData ? id : null,
        name: name,
        biography: biography
      };

      try {
        let response;
        if (newAuthor.authorId) {
          console.log("enter the update");
          console.log(newAuthor)
          // Update existing book
          response = await fetch(
            `https://localhost:7025/api/Author/${newAuthor.authorId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newAuthor),
            }
          );
          const data = await response.json();
          console.log(data);
          handleClose();
          handleCallBack(data);
          resetForm();
        } else {
          const newAuthor = {
            name: name,
            biography: biography,
          };
          console.log("enter the new");
          // Create new book
          response = await fetch(
            "https://localhost:7025/api/Author",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newAuthor),
            }
          );
         
          const data = await response.json();
          handleCallBack(data);
          handleClose();
          resetForm();
        }
        if (!response.ok) {
          resetForm();
          throw new Error("Network response was not ok");
         
        }
      } catch (error) {
        console.error(
          `Error ${newAuthor.id ? "updating" : "creating"} author:`,
          error
        );
      }
    }
  };

  return (
    <div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        backdrop="static"
        style={{ width: "50vw", zIndex: 1050 }}
      >
        <Offcanvas.Header closeButton style={{ backgroundColor: "#0E345A" }}>
          <Offcanvas.Title style={{ color: "white" }}>
            Add New Author / Update Existing Author
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
                  Author Name
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Author Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Biography
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="biography"
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  placeholder="Enter book description"
                  rows={4}
                  required
                  isInvalid={!!errors.biography}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.biography}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="text-center">
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
export default AuthorOffCanvas;
