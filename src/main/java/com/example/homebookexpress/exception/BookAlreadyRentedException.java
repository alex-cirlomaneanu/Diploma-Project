package com.example.homebookexpress.exception;

public class BookAlreadyRentedException extends RuntimeException {
    public BookAlreadyRentedException(String appUser, String book) {
        super("Utilzatorul " + appUser + " a împrumutat deja cartea " + book);
    }
}
