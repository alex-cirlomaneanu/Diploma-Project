import React from "react";
import { Card } from "react-bootstrap";

const BookPageImage = ({ book }) => {
    return (
        <div className="book-image-container">
            <Card className="book-image-card">
                <Card.Body>
                    {book.bookImage === null ? (
                        <img src="/book-cover.jpg" alt={book.title} />
                    ) : (
                        <img src={book.bookImage} alt={book.title} />
                    )}
                    <Card.Text>
                        {book.availableCopies !== 0
                            ? "Cartea este disponibilă"
                            : "Cartea nu este disponibilă"}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default BookPageImage;
