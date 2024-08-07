import React, { useEffect, useState, useCallback } from "react";
import { Container, Button, Form, InputGroup } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AuthorCard from "./AuthorCard";
import AuthorOffCanvas from "./AuthorOffCanvas";
import ToastComponent from "./ToastComponent";

const AuthorPage = () => {
  const [authors, setAuthors] = useState([]);
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchAuthorsDetails();
  }, []);

  const applyFilters = useCallback(() => {
    if (!Array.isArray(authors)) return;

    console.log("initial authors are", authors);
    const filtered = authors.filter((author) =>
      searchTerm === "" || author.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAuthors(filtered);
    console.log("filtered authors are:", filtered);
  }, [authors, searchTerm]);

  useEffect(() => {
    applyFilters();
  }, [authors, searchTerm, applyFilters]);

  const handleShowToast = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const handleCallBack = (updatedAuthor) => {
    console.log("Updating author with ID:", updatedAuthor.id);
    setAuthors((prevAuthors) => {
      const index = prevAuthors.findIndex((author) => author.authorId === updatedAuthor.authorId);
      if (index !== -1) {
        const updatedAuthors = [
          ...prevAuthors.slice(0, index),
          updatedAuthor,
          ...prevAuthors.slice(index + 1),
        ];
        handleShowToast("Author updated successfully", "success");
        return updatedAuthors;
      } else {
        handleShowToast("Author created successfully", "success");
        return [...prevAuthors, updatedAuthor];
      }
    });
  };

  const onHandleDeleteCallBack = (item) => {
    console.log("Deleting author with ID:", item.authorId);
    deleteAuthor(item.authorId);
  };

  const deleteAuthor = async (authorId) => {
    try {
      const response = await fetch(`https://localhost:7025/api/Author/${authorId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.log("error toast")
        handleShowToast("Author unable to deleted", "warning");
       // throw new Error("Author not deleted");
      }else{
        setAuthors((prevAuthors) => prevAuthors.filter((author) => author.authorId !== authorId));
        handleShowToast("Author deleted successfully", "success");
      }
     
    } catch (error) {
      console.error(`Error deleting author with ID ${authorId}:`, error);
    }
  };

  const fetchAuthorsDetails = async () => {
    try {
      const response = await fetch("https://localhost:7025/api/Author");
      const data = await response.json();
      if (Array.isArray(data)) {
        setAuthors(data);
      } else if (data && data.$values && Array.isArray(data.$values)) {
        setAuthors(data.$values);
      } else {
        console.error("Unexpected response format:", data);
        setAuthors([]);
      }
      console.log("Fetched authors:", data);
    } catch (error) {
      console.error("Error fetching authors details:", error);
    }
  };

  if (!authors.length) {
    return <div>Loading the page....</div>;
  }

  const handleAuthorOffCanvas = () => {
    handleShow();
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={3}>
            <div style={{ marginTop: "5rem", marginBottom: "4rem" }}>
              <h5 style={{ textAlign: "left" }}>Search By</h5>
              <div className="filter-divider" style={{ marginBottom: "5px", alignItems: "left" }}>
                <hr />
              </div>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                  placeholder="Author name"
                  aria-label="Author"
                  aria-describedby="basic-book"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>
            <div className="filter-divider" style={{ marginBottom: "5px", alignItems: "left" }}>
              <hr />
            </div>
            <Button
              className="w-100 custom-borderless-btn"
              style={{
                backgroundColor: "#0E345A",
                border: "none",
                width: "200px",
                marginTop: "50px",
              }}
              onClick={handleAuthorOffCanvas}
            >
              Add Author
            </Button>

            {show && (
              <AuthorOffCanvas
                handleCallBack={handleCallBack}
                show={show}
                handleClose={handleClose}
              />
            )}
          </Col>

          <Col md={9}>
            <div>
              <div>
                <span>Our</span>
                <h1>Authors</h1>
              </div>

              <div>
                <div className="book-list">
                  {filteredAuthors.map((author) => (
                    <AuthorCard
                      key={author.authorId} // Use unique ID for keys
                      author={author}
                      onHandleDeleteCallBack={onHandleDeleteCallBack}
                      handleCallBack={handleCallBack}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <ToastComponent
        showToast={showToast}
        setShowToast={setShowToast}
        message={toastMessage}
        variant={toastVariant}
      />
    </div>
  );
};

export default AuthorPage;
