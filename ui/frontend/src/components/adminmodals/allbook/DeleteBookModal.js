import React, { useState } from "react";
import axios from "axios";

const DeleteBookModal = ({ book }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteBookId, setDeleteBookId] = useState(null);

    const handleDelete = (book) => {
        console.log("Delete book: ", book);
        setDeleteBookId(book.bookId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const url = `http://localhost:8080/api/v1/book/deletebook?bookId=${deleteBookId}`;
            const response = await axios.delete(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response;
            console.log("Delete book response: ", data);
        } catch (error) {
            console.error(error);
        }
        setShowDeleteModal(false);
    };

    const handleCancelDelete = () => {
        setDeleteBookId(null);
        setShowDeleteModal(false);
    };

    return (
        <>
            <button onClick={() => handleDelete(book)}>Delete Book</button>

            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirm Delete</h3>
                        <p>Are you sure you want to delete this book?</p>
                        <button onClick={handleConfirmDelete}>Yes</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteBookModal;
