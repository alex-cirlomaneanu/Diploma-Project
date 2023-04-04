package com.example.homebookexpress.exception;

public class BookNotAvailableException extends RuntimeException{
    public BookNotAvailableException(String bookTitle) {
        super(bookTitle + " not available");
    }
}
