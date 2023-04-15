package com.example.homebookexpress.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String userEmail) {
        super("User with name " + userEmail + " not found");
    }
}
