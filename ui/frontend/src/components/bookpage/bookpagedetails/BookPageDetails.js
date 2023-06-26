import React, {useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";
import RentalHandler from "../../rental/RentBook";
import axios from "axios";

const BookPageDetails = ({ book }) => {
    const authorName = book.author?.authorName;
    const [, setShow] = useState(false)
    const [similarBooks, setSimilarBooks] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authorName = book.author.authorName.replace(" ", "%20");
                const url =  `http://localhost:8080/api/v1/authors/getallbooksbyauthorname?authorName=${authorName}`;
                const response =
                    await axios.get(url,
                        {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem('token')
                            }
                        });
                setSimilarBooks(response.data)
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData().then(r => r).catch(err => err);
    }, [book.author?.authorName]);

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
                            {book.availableCopies === 0 ?
                                (
                                    <Button variant="outline-danger">
                                        Cartea nu poate fi împrumutată
                                    </Button>
                                ) :
                                (
                                <RentalHandler bookTitle={book.title} />
                            )}
                        </Card.Text>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Cărți de la același autor</Card.Title>
                    {
                        similarBooks.length > 0 && (
                        <ul>
                        {similarBooks.map((book) => (
                            <li key={book.bookId}>
                                <a href={`/books/${book.bookId}`}> {book.title}</a>
                            </li>
                            ))}
                        </ul>
                        )
                    }
                </Card.Body>
            </Card>
        </div>
    );
};

export default BookPageDetails;
