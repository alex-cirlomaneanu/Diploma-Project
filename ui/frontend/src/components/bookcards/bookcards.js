import React from 'react';
import {Link} from "react-router-dom";
import {Card, Col, Row} from "react-bootstrap";

const BookCard = ({book, index}) => {
    return (
                <Col key={index} xs={12} sm={6} md={4} lg={3}>
                    <Link className={"text-decoration-none"} to={`/books/${book.bookId}`}>
                        <Card className="book-card">
                            {book.bookImage === null ? (
                                <Card.Img variant="top" src="/book-cover.jpg" />
                            ) : (
                               <Card.Img variant="top" src={book.bookImage} />
                            )}
                            <Card.Body>
                                <Card.Title className={"text-danger"}>{book.title}</Card.Title>
                                <Card.Text>
                                    <p>Autor: {book.author.authorName}</p>
                                    <p>Număr cărți disponibile: {book.availableCopies}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
    );
}

export default BookCard;