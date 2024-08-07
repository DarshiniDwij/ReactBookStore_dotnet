// ProductCard.jsx
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import BookModal from './BookModal';
import ItemOffCanvas from './ItemOffCanvas';

const ProductCard = ({
  book,
  handleCallBack,
  onHandleDeleteCallBack,
  backgroundColor,
  color,
  buttonBorderStyle,
}) => {
  const [showFooter, setShowFooter] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [author, setAuthor] = useState(null);
  const [genre, setGenre] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [show, setShow] = useState(false);

  const imageUrl = `/images/Books/${book.title}.png`;

  const handleMouseEnter = () => setShowFooter(true);
  const handleMouseLeave = () => setShowFooter(false);
  const handleClose = () => setModalShow(false);

  const onHandleCallBack = (item) => {
    console.log("closing2......")
    setModalShow(false);
    console.log(modalShow);
    setEditItem(item);
    setShow(true);
  };

  const onHandleDeleteCallBack1 = (item) => {
    setModalShow(false);
    onHandleDeleteCallBack(item);
  };

  const fetchAuthor = async () => {
    try {
      const response1 = await fetch(`https://localhost:7025/api/Author/${book.authorId}`);
      if (!response1.ok) throw new Error('Failed to fetch author');
      const data1 = await response1.json();
      setAuthor(data1.name);
    } catch (error) {
      console.error('Error fetching author:', error);
    }
  };

  const fetchGenre = async () => {
    try {
      const response2 = await fetch(`https://localhost:7025/api/Genre/${book.genreId}`);
      if (!response2.ok) throw new Error('Failed to fetch genre');
      const data2 = await response2.json();
      setGenre(data2.genreName);
    } catch (error) {
      console.error('Error fetching genre:', error);
    }
  };

  const onClickEventHandler = async () => {
    try {
      await Promise.all([fetchAuthor(), fetchGenre()]);
      setModalShow(true);
    } catch (error) {
      console.error('Error handling onClickEventHandler:', error);
    }
  };

  return (
    <div style={{ height: '20rem' }}>
      {book && (
        <Card
          style={{
            width: '12rem',
            border: 'none',
            borderRadius: '0 !important',
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Card.Img variant="top" src={imageUrl} />
          <Card.Body style={{ backgroundColor, color }}>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>{book.price}</Card.Text>
          </Card.Body>
          {showFooter && (
            <Card.Footer className="text-center" style={{ backgroundColor: '#0E345A' }}>
              <Button
                className="w-100 custom-borderless-btn"
                style={{ backgroundColor: '#0E345A', border: buttonBorderStyle }}
                onClick={onClickEventHandler}
              >
                View Details
              </Button>
            </Card.Footer>
          )}
        </Card>
      )}
      <BookModal
        show={modalShow}
        onHide={handleClose}
        book={book}
        author={author}
        genre={genre}
        onHandleCallBack={onHandleCallBack}
        onHandleDeleteCallBack1={onHandleDeleteCallBack1}
      />
      {editItem && (
        <ItemOffCanvas
          handleCallBack={handleCallBack}
          bookData={editItem}
          show={show}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default ProductCard;
