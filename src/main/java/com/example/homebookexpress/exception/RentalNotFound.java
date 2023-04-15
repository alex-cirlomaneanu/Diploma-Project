package com.example.homebookexpress.exception;

public class RentalNotFound extends RuntimeException{
    public RentalNotFound(String userEmail, String bookTitle) {
        super(String.format("Rental for user %s and book %s not found", userEmail, bookTitle));
    }
}
