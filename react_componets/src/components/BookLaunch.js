import React, { useState, useEffect } from "react";
import "./BookLaunch.css";

const BookLaunch = () => {
  const [book, setBook] = useState({});
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookAndAuthorDetails = async () => {
      try {
        const bookResponse = await fetch(
          "https://localhost:7025/api/Book/upcoming-publication"
        );
        if (!bookResponse.ok) {
          throw new Error("Failed to fetch book details");
        }
        const bookData = await bookResponse.json();
        setBook(bookData);
        setLoading(false);

        // Fetch author details only if bookData.author_id exists
        if (bookData.authorId) {
          const authorResponse = await fetch(
            `https://localhost:7025/api/Author/${bookData.authorId}`
          );
          if (!authorResponse.ok) {
            throw new Error("Failed to fetch author details");
          }
          const authorData = await authorResponse.json();
          setAuthor(authorData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchBookAndAuthorDetails();
  }, []);
  // const formattedDate = formatDate(book.publication_date);
  const imageUrl = `/images/Books/${book.title}.png`;

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

  return (
    <div>
      <div>
        <div>
          <h5 style={{ color: "#0E345A", marginTop: "40px" }}>Coming Up</h5>{" "}
        </div>
        <div style={{ fontSize: "60px", lineHeight: 1, color: "#0E345A" }}>
          BOOK LAUNCH
        </div>
        <br />
      </div>

      <div className="book-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="book-details">
            <div className="book-info">
              <p>
                <h2>Book:{book.title}</h2>
              </p>
              {author && (
                <p>
                  <b>By:</b> {author.name}
                </p>
              )}
              <p>
                <b>When:</b> {formatDate(book.publicationDate)}
              </p>
            </div>
            <img src={imageUrl} alt={book.title} className="book-image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookLaunch;
