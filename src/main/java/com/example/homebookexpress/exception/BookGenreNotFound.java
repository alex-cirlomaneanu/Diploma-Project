package com.example.homebookexpress.exception;

public class BookGenreNotFound extends RuntimeException{
    public BookGenreNotFound(String bookGenreName) {
        super("Book genre " + bookGenreName + " not found");
    }
}
