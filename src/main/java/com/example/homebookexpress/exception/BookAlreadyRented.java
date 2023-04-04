package com.example.homebookexpress.exception;

public class BookAlreadyRented extends RuntimeException {
    public BookAlreadyRented(String appUser, String book) {
        super("User " + appUser + " already rented book " + book);
    }
}
