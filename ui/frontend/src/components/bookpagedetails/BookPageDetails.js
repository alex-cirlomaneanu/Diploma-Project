import React from "react";
import { Card } from "react-bootstrap";

const BookPageDetails = ({ book, userEmail, handleRental }) => {
    const authorName = book.author?.authorName;

    return (
        <div className="book-details-container">
            <Card className="book-details-card">
                <Card.Header>
                    <Card.Title>{book.title}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Detalii</Card.Title>
                    <br />
                    <Card.Text>
                        <p>
                            Autor: <b>{authorName}</b>
                        </p>
                        <br />
                        <p>
                            Genuri:{" "}
                            {book.bookGenres && (
                                <ul>
                                    {book.bookGenres.map((genre) => (
                                        <li key={genre.genreId}>
                                            <b>{genre.genreName}</b>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </p>
                        <br />
                        {book.rentals != null && book.rentals.length > 0 ? (
                            <>
                                {book.rentals.length === 1 ? (
                                    <p>Cartea a fost împrumutată o singură dată</p>
                                ) : (
                                    <p>Cartea a fost împrumutată de {book.rentals.length} ori</p>
                                )}
                            </>
                        ) : (
                            <p>Cartea nu a fost împrumutată încă</p>
                        )}
                        <Card.Text>
                            {book.availableCopies !== 0 && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleRental(book.title, userEmail)}
                                >
                                    Împrumută
                                </button>
                            )}
                        </Card.Text>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default BookPageDetails;
