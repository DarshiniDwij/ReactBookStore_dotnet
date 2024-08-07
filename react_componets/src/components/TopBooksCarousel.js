import React from "react";
import ProductCard from "./ProductCard";

const TopBooksCarousel = ({ books }) => {
  return (
    <div className="top-books-carousel">
      {books.map((book) => (
        <ProductCard
          key={book.id}
          book={book}
          backgroundColor={"#0E345A"}
          color={"white"}
          buttonBorderStyle={"3px solid white"}
        />
      ))}
    </div>
  );
};

export default TopBooksCarousel;
