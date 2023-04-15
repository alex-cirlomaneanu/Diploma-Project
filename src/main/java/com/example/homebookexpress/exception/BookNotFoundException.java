package com.example.homebookexpress.exception;

public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(String bookTitle) {
        super("Book with title " + bookTitle + " not found");
    }
}
