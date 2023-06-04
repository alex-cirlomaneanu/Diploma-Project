import React, {useState} from "react";
import {PageItem, Pagination} from "react-bootstrap";
import "./Pagination.css";

const PaginationBar = ({elements, elementsPerPage, currentPage, handlePageChange}) => {
    return (
        <Pagination className="book-pagination">
            <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
            />
            {[...Array(Math.ceil(elements.length / elementsPerPage)).keys()].map((pageNumber) => (
                <PageItem
                    className="book-page-item"
                    key={pageNumber + 1}
                    active={pageNumber + 1 === currentPage}
                    onClick={() => handlePageChange(pageNumber + 1)}
                >
                    {pageNumber + 1}
                </PageItem>
            ))}
            <Pagination.Next
                disabled={currentPage === Math.ceil(elements.length / elementsPerPage)}
                onClick={() => handlePageChange(currentPage + 1)}
            />
        </Pagination>
    );
}

export default PaginationBar;