import React, { useState, useEffect } from "react";
import { Offcanvas, Form, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ItemOffCanvas = ({ handleCallBack, show, handleClose, bookData }) => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLang, setSelectedLang] = useState("");
  const [amount, setAmount] = useState("");
  const [booksPresent, setBooksPresent] = useState(0);
  const [booksSold, setBooksSold] = useState(0);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    author: "",
    genre: "",
    pstatus: "",
    description: "",
    date: "",
    language: "",
    cost: "",
    booksPresent: "",
    booksSold: "",
  });

  useEffect(() => {
    if (bookData) {
      setId(bookData.bookId || "");
      setTitle(bookData.title || "");
      setSelectedAuthor(bookData.authorId || "");
      setSelectedGenre(bookData.genreId || "");
      setIsPublished(bookData.published || false);
      setSelectedDate(
        bookData.publicationDate ? new Date(bookData.publicationDate) : null
      );
      setSelectedLang(bookData.language || "");
      setAmount(bookData.price || "");
      setDescription(bookData.description || "");
      setBooksPresent(bookData.booksPresent || "");
      setBooksSold(bookData.booksSold || "");
    }
  }, [bookData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      setValidated(true);
      console.log("book id is:" + id);
      const newBook = {
        bookId: bookData ? id : null,
        title: title,
        authorId: selectedAuthor,
        genreId: selectedGenre,
        published: isPublished,
        publicationDate: selectedDate,
        language: selectedLang,
        price: amount,
        description: description,
        imagePath: title + ".png",
        booksPresent: booksPresent,
        booksSold: booksSold,
      };

      try {
        let response;
        if (newBook.bookId) {
          console.log("enter the update");
          // Update existing book
          response = await fetch(
            `https://localhost:7025/api/Book/${newBook.bookId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newBook),
            }
          );
          const data = await response.json();
          console.log(data);
          handleCallBack(newBook);
          console.log("closing.......");
         // handleClose();
        //  resetForm();
        } else {
          console.log("enter the new");
          const newBook = {
            title: title,
            authorId: selectedAuthor,
            genreId: selectedGenre,
            published: isPublished,
            publicationDate: selectedDate,
            language: selectedLang,
            price: amount,
            description: description,
            imagePath: title + ".png",
            booksPresent: booksPresent,
            booksSold: booksSold,
          };
          console.log(newBook);
          // Create new book
          response = await fetch("https://localhost:7025/api/Book", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
          });
          const data = await response.json();
          handleCallBack(data);
          handleClose();
          resetForm();
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // console.log(
        //   `Book ${newBook.id ? "updated" : "created"} successfully:`,
        //   data
        // );
      } catch (error) {
        console.error(
          `Error ${newBook.id ? "updating" : "creating"} book:`,
          error
        );
      }
    } else {
      console.log("Form has errors. Cannot submit.");
    }
  };

  const resetForm = (e) => {
    // e.preventDefault();
    setValidated(false);
    setTitle("");
    setSelectedAuthor("");
    setSelectedGenre("");
    setIsPublished(false);
    setSelectedDate(null);
    setSelectedLang("");
    setAmount("");
    setDescription("");
    setBooksPresent("");
    setBooksSold("");

    setErrors({
      title: "",
      author: "",
      genre: "",
      pstatus: "",
      description: "",
      date: "",
      language: "",
      cost: "",
      booksPresent: "",
      booksSold: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    }
    if (!selectedAuthor) {
      newErrors.author = "Author is required";
      valid = false;
    }
    if (!selectedGenre) {
      newErrors.genre = "Genre is required";
      valid = false;
    }
    if (!selectedLang) {
      newErrors.language = "Language is required";
      valid = false;
    }
    if (!amount) {
      newErrors.cost = "Cost is required";
      valid = false;
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }
    if (!booksPresent) {
      newErrors.booksPresent = "Number of books in stock is required";
      valid = false;
    }
    if (!booksSold) {
      newErrors.booksSold = "Number of sold is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleCancel = () => {
    resetForm();
    handleClose();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setErrors({ ...errors, date: "" });
  };

  const handleDescChange = (event) => {
    setDescription(event.target.value);
    setErrors({ ...errors, description: "" });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setErrors({ ...errors, title: "" });
  };

  const handlePublishStatusChange = (event) => {
    setIsPublished(event.target.value === "true");
    setErrors({ ...errors, pstatus: "" });
  };

  const handleAmountChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    setAmount(value);
    setErrors({ ...errors, cost: "" });
  };

  const handleBooksPresentChange = (event) => {
    setBooksPresent(event.target.value);
    setErrors({ ...errors, booksPresent: "" });
  };

  const handleBooksSold = (event) => {
    setBooksSold(event.target.value);
    setErrors({ ...errors, booksSold: "" });
  };

  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
    setErrors({ ...errors, author: "" });
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setErrors({ ...errors, genre: "" });
  };

  const handleLangChange = (event) => {
    setSelectedLang(event.target.value);
    setErrors({ ...errors, language: "" });
  };

  useEffect(() => {
    // Fetch Authors details from API
    const fetchAuthors = async () => {
      try {
        const response1 = await fetch(
          "https://localhost:7025/api/Author"
        );
        const data1 = await response1.json();
        if (Array.isArray(data1)) {
          setAuthors(data1);
        } else if (data1 && data1.$values && Array.isArray(data1.$values)) {
          setAuthors(data1.$values);
        } else {
          console.error("Unexpected response format:", data1);
          setAuthors([]);
        } // Assuming API response is JSON with author details // Assuming API response is JSON with author details
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  useEffect(() => {
    // Fetch Genres details from API
    const fetchGenres = async () => {
      try {
        const response2 = await fetch("https://localhost:7025/api/Genre");
        const data2 = await response2.json();
        if (Array.isArray(data2)) {
          setGenres(data2);
        } else if (data2 && data2.$values && Array.isArray(data2.$values)) {
          setGenres(data2.$values);
        } else {
          console.error("Unexpected response format:", data2);
          setGenres([]);
        }  // Assuming API response is JSON with genre details
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        backdrop="static"
        style={{ width: "50vw", zIndex: 1050 }}
      >
        <Offcanvas.Header closeButton style={{ backgroundColor: "#0E345A" }}>
          <Offcanvas.Title style={{ color: "white" }}>
            Add New Book / Update Existing Book
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form
            id="myForm"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Form.Group as={Col} controlId="firstName">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Book Title
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Book Title"
                  value={title}
                  onChange={handleTitleChange}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="gender">
                <Form.Label style={{ fontWeight: "bold" }}>Author</Form.Label>
                <Form.Select
                  name="author"
                  value={selectedAuthor}
                  onChange={handleAuthorChange}
                  isInvalid={!!errors.author}
                >
                  <option value="">Select an author</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.authorId}>
                      {author.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.author}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="gender">
                <Form.Label style={{ fontWeight: "bold" }}>Genre</Form.Label>
                <Form.Select
                  name="genre"
                  value={selectedGenre}
                  onChange={handleGenreChange}
                  isInvalid={!!errors.genre}
                >
                  <option value="">Select a genre</option>
                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.genreId}>
                      {genre.genreName}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.genre}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Publish Status
                </Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="Published"
                    name="publishStatus"
                    id="published"
                    value={true}
                    checked={isPublished === true}
                    onChange={handlePublishStatusChange}
                    isInvalid={!!errors.pstatus}
                  />
                  <Form.Check
                    type="radio"
                    label="Not Published"
                    name="publishStatus"
                    id="notPublished"
                    value={false}
                    checked={isPublished === false}
                    onChange={handlePublishStatusChange}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  {errors.pstatus}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="gender">
                <Form.Label style={{ fontWeight: "bold" }}>Language</Form.Label>
                <Form.Select
                  name="language"
                  value={selectedLang}
                  onChange={handleLangChange}
                  isInvalid={!!errors.language}
                >
                  <option value="">Select language</option>
                  <option value="Kannada">Kannada</option>
                  <option value="English">English</option>
                  <option value="other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.language}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Cost of the Book
                </Form.Label>
                <Form.Control
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter amount"
                  className="form-control"
                  required
                  isInvalid={!!errors.cost}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cost}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Number of Books in Stock
                </Form.Label>
                <Form.Control
                  type="number"
                  value={booksPresent}
                  onChange={handleBooksPresentChange}
                  placeholder="Enter Number of Books"
                  className="form-control"
                  required
                  isInvalid={!!errors.booksPresent}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.booksPresent}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Number of Books Sold
                </Form.Label>
                <Form.Control
                  type="number"
                  value={booksSold}
                  onChange={handleBooksSold}
                  placeholder="Enter Number of Sold"
                  className="form-control"
                  required
                  isInvalid={!!errors.booksSold}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.booksSold}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={description}
                  onChange={handleDescChange}
                  placeholder="Enter book description"
                  rows={4}
                  required
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Publication Date
                </Form.Label>
                <br />
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  placeholderText="Select a date"
                  className="form-control"
                  required
                  isInvalid={!!errors.date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.date}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="text-center">
              <button className="modal-button mx-2" type="submit">
                SUBMIT
              </button>
              <button
                className="modal-button mx-2"
                type="button"
                onClick={handleCancel}
              >
                CANCEL
              </button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ItemOffCanvas;