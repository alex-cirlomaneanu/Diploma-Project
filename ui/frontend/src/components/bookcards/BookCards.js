import React from 'react';
import {Link} from "react-router-dom";
import {Card, Col} from "react-bootstrap";
import "./BookCards.css";

const BookCard = ({book, index}) => {
    return (
            <Col key={index} xs={6} sm={4} md={3} lg={3} xl={2} className="col-card">
                <div className="card-container">
                    <Link className={"text-decoration-none"} to={`/books/${book.bookId}`}>
                        <Card className="book-card bg-transparent border-1" style={{ height: "100%"}}>
                            {book.bookImage === null ? (
                                <Card.Img variant="top" src="/book-cover.jpg" />
                            ) : (
                               <Card.Img variant="top" src={book.bookImage} />
                            )}
                            <Card.Body className={"card-body"}>
                                <Card.Title className={"card-title"}>{book.title}</Card.Title>
                                <Card.Text>
                                    <p>Autor: {book.author.authorName}</p>
                                    <p>Număr cărți disponibile: {book.availableCopies}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
            </Col>
    );
}

export default BookCard;