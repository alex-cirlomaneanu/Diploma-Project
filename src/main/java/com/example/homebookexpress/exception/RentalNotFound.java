package com.example.homebookexpress.exception;

public class RentalNotFound extends RuntimeException{
    public RentalNotFound(String userEmail, String bookTitle) {
        super(String.format("Împrumtul %s - %s nu există", userEmail, bookTitle));
    }
}
