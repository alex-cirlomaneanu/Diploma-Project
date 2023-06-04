import React from 'react';
import { Carousel, Card, Row, Col } from 'react-bootstrap';
import './BookCarousel.css';
import {Link} from "react-router-dom";

const BookCarousel = ({ books }) => {
    const bookChunks = chunkArray(books, 3); // Split books into chunks of 3

    return (
        <Carousel interval={null} indicators={false} variant="dark">
            {bookChunks.map((chunk, index) => (
                <Carousel.Item key={index}>
                    <Row>
                        {chunk.map((book, innerIndex) => (
                            <Col key={innerIndex} sm={4}>
                                <Link className="link-to-book" to={`/books/${book.bookId}`}>
                                    <Card className="book-card-carousel bg-transparent">
                                        {book.bookImage === null ? (
                                            <Card.Img variant="top" src="/book-cover.jpg" />
                                        ) : (
                                            <Card.Img variant="top" src={book.bookImage} />
                                        )}
                                        <Card.Body className="book-card-carousel-body">
                                            <Card.Title className="book-card-carousel-title">{book.title}</Card.Title>
                                            <Card.Text className="book-card-carousel-text">
                                                <p>Autor: {book.author.authorName}</p>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

// Helper function to split array into chunks
function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

export default BookCarousel;
