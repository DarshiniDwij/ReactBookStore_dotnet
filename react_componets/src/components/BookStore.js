import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import ProductCard from "./ProductCard";
import ItemOffCanvas from "./ItemOffCanvas";
import ToastComponent from "./ToastComponent";
import GenreOffCanvas from "./GenreOffCanvas";
import FadeLoader from "react-spinners/FadeLoader";

const override = {
  display: "block",
  margin: "0 auto",
  color: "#0E345A",
};

const BookStore = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedLang, setSelectedLang] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [showAuthorList, setAuthorShowList] = useState(false);
  const [showGenreList, setGenreList] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [show, setShow] = useState(false);
  const [genreShow, setGenreShow] = useState(false);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch("https://localhost:7025/api/Book");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        setBooks(data);
        setLoading(false);
      } else if (data && data.$values && Array.isArray(data.$values)) {
        console.log("Mybooks are :", data.$values)
        setBooks(data.$values);
        setLoading(false);
      } else {
        console.error("Unexpected response format:", data);
        setBooks([]);
      }
     
      
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  

  useEffect(() => {
    fetchBookDetails();
  }, []);

  useEffect(() => {
    console.log("Books updated:", books);
    // Apply filters here if needed based on other states like selectedAuthor, selectedGenre, etc.
  }, [books]);

  useEffect(() => {
    if (books) {
      applyFilters(searchTerm, selectedAuthor, selectedGenre, selectedLang);
    }
  }, [books, searchTerm, selectedAuthor, selectedGenre, selectedLang]);

  const applyFilters = (
    searchTerm,
    selectedAuthor,
    selectedGenre,
    selectedLang
  ) => {
    if (!books) return;
    let filtered = books.filter((book) => {
      return (
        (searchTerm === "" ||
          book.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedAuthor === null || book.authorId === selectedAuthor) &&
        (selectedGenre === null || book.genreId === selectedGenre) &&
        (selectedLang === null ||
          book.language.toLowerCase() === selectedLang.toLowerCase())
      );
    });
    setFilteredBooks(filtered);
    //setBooks(filtered);
  };

  const handleAuthorClick = (authorId) => {
    setSelectedAuthor(authorId === selectedAuthor ? null : authorId);
  };

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId === selectedGenre ? null : genreId);
  };

  const handleLangClick = (lang) => {
    setSelectedLang(lang === selectedLang ? null : lang);
  };

  const handleShowToast = (message, variant) => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  const onHandleDeleteCallBack = async (item) => {
    try {
      const response = await fetch(
        `https://localhost:7025/api/Book/${item.bookId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Book not Deleted");
      }
      const updatedBooks = books.filter(
        (book) => book.bookId !== item.bookId
      );
      setBooks(updatedBooks);
      handleShowToast("Book deleted Successfully", "success");
    } catch (error) {
      console.error(`Error deleting book with ID ${item.bookId}:`, error);
    }
  };

  const handleCallBack = (updatedBook) => {
    let index = books.findIndex((book) => book.bookId === updatedBook.bookId);
    if (index !== -1) {
      let updatedBooks = [
        ...books.slice(0, index),
        updatedBook,
        ...books.slice(index + 1),
      ];
      setBooks(updatedBooks);
      // setFilteredBooks(books);
      handleShowToast("Book updated Successfully", "success");
    } else {
      setBooks([...books, updatedBook]);
      // setFilteredBooks(books);
      handleShowToast("Book created Successfully", "success");
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("https://localhost:7025/api/Genre");
        const data = await response.json();
        if (Array.isArray(data)) {
          setGenres(data);
        } else if (data && data.$values && Array.isArray(data.$values)) {
          setGenres(data.$values);
        } else {
          console.error("Unexpected response format:", data);
          setGenres([]);
        }
         // Assuming data is an array of author objects
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(
          "https://localhost:7025/api/Author"
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          setAuthors(data);
        } else if (data && data.$values && Array.isArray(data.$values)) {
          setAuthors(data.$values);
        } else {
          console.error("Unexpected response format:", data);
          setAuthors([]);
        }// Assuming data is an array of author objects
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleGenreCallBack = (newGenre) => {
    setGenres([...genres, newGenre]);
    handleShowToast("Genre created Successfully", "success");
  };

  const toggleAuthorList = () => {
    setAuthorShowList(!showAuthorList);
  };

  const toggleGenreList = () => {
    setGenreList(!showGenreList);
  };

  const togglePriceList = () => {
    setShowPrice(!showPrice);
  };

  const handleoffCanvas = () => {
    setShow(true);
  };

  const handleGenreOffCanvas = () => {
    setGenreShow(true);
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 10000);

  //   return () => clearTimeout(timer); // Clear the timeout if component unmounts
  // }, []);

  return (
    <div style={{ backgroundColor: "white" }}>
      <Container>
        <Row>
          <Col md={3}>
            <div style={{ marginTop: "2rem" }}>
              <h5 style={{ textAlign: "left" }}>Search By</h5>
              <div
                className="filter-divider"
                style={{ marginBottom: "5px", alignItems: "left" }}
              >
                <hr />
              </div>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                  placeholder="Book name"
                  aria-label="Book"
                  aria-describedby="basic-book"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <h5 style={{ textAlign: "left" }}>Filter By</h5>
              <div
                className="filter-divider"
                style={{ marginBottom: "5px", alignItems: "left" }}
              >
                <hr />
              </div>

              <button
                className="filter-button"
                onClick={toggleAuthorList}
                style={{ width: "100%" }}
              >
                Authors {showAuthorList ? <span>-</span> : <span>+</span>}
              </button>
              {showAuthorList && (
                <div>
                  <ul className="filter-list">
                    <li key={""} onClick={() => handleAuthorClick(null)}>
                      <b>All</b>
                    </li>
                    {authors.map((author) => (
                      <li
                        key={author.authorId}
                        onClick={() => handleAuthorClick(author.authorId)}
                        className={
                          selectedAuthor === author.author_id
                            ? "highlighted"
                            : ""
                        }
                      >
                        {author.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="filter-divider" style={{ marginBottom: "5px" }}>
                <hr />
              </div>

              <button
                className="filter-button"
                onClick={toggleGenreList}
                style={{ width: "100%" }}
              >
                Genre {showGenreList ? <span>-</span> : <span>+</span>}
              </button>
              <div style={{ display: showGenreList ? "block" : "none" }}>
                <ul className="filter-list">
                  <li key={""} onClick={() => handleGenreClick(null)}>
                    <b>All</b>
                  </li>
                  {genres.map((genre) => (
                    <li
                      key={genre.genreId}
                      onClick={() => handleGenreClick(genre.genreId)}
                      className={
                        selectedGenre === genre.genreId ? "highlighted" : ""
                      }
                    >
                      {genre.genreName}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="filter-divider" style={{ marginBottom: "5px" }}>
                <hr />
              </div>

              <button
                className="filter-button"
                onClick={togglePriceList}
                style={{ width: "100%" }}
              >
                Language {showPrice ? <span>-</span> : <span>+</span>}
              </button>
              <div style={{ display: showPrice ? "block" : "none" }}>
                <ul className="filter-list">
                  <li onClick={() => handleLangClick(null)}>
                    <b>All</b>
                  </li>
                  <li
                    onClick={() => handleLangClick("Kannada")}
                    className={selectedLang === "Kannada" ? "highlighted" : ""}
                  >
                    Kannada
                  </li>
                  <li
                    onClick={() => handleLangClick("English")}
                    className={selectedLang === "English" ? "highlighted" : ""}
                  >
                    English
                  </li>
                  <li
                    onClick={() => handleLangClick("other")}
                    className={selectedLang === "other" ? "highlighted" : ""}
                  >
                    Other
                  </li>
                </ul>
              </div>

              <div className="filter-divider" style={{ marginBottom: "30px" }}>
                <hr />
              </div>

              <Button
                className="w-100 custom-borderless-btn"
                style={{
                  backgroundColor: "#0E345A",
                  border: "none",
                  width: "200px",
                }}
                onClick={handleoffCanvas}
              >
                Add Book
              </Button>

              <Button
                className="w-100 custom-borderless-btn"
                style={{
                  backgroundColor: "#0E345A",
                  border: "none",
                  width: "200px",
                  marginTop: "40px",
                }}
                onClick={handleGenreOffCanvas}
              >
                Add Genre
              </Button>

              <ItemOffCanvas
                handleCallBack={handleCallBack}
                show={show}
                handleClose={() => setShow(false)}
              />

              <GenreOffCanvas
                handleGenreCallBack={handleGenreCallBack}
                genreShow={genreShow}
                handleGenreClose={() => setGenreShow(false)}
              />
            </div>
          </Col>
          <Col md={9}>
            <div>
              <div>
                <span>Our</span>
                <h1>Book Store</h1>
              </div>
              <div>
                <div className="book-list">
                  {loading ? (
                    <div style={{ marginTop: "150px", marginLeft: "380px" }}>
                      <FadeLoader
                        loading={loading}
                        size={50}
                        cssOverride={override}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                  ) : (
                    filteredBooks.map((book, index) => (
                      <ProductCard
                        key={index}
                        book={book}
                        handleCallBack={handleCallBack}
                        onHandleDeleteCallBack={onHandleDeleteCallBack}
                        buttonBorderStyle={"none"}
                      />
                    ))
                  )}
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

export default BookStore;
