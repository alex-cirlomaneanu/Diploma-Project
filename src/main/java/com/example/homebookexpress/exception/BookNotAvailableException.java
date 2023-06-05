package com.example.homebookexpress.exception;

public class BookNotAvailableException extends RuntimeException{
    public BookNotAvailableException(String bookTitle) {
        super(" Cartea " + bookTitle + " nu este disponibilă");
    }
}
