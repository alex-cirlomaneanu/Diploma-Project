package com.example.homebookexpress.exception;

import java.util.UUID;

public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(String bookTitle) {
        super("Book with title " + bookTitle + " not found");
    }

    public BookNotFoundException(UUID bookId) {
        super("Book with id " + bookId + " not found");
    }
}
