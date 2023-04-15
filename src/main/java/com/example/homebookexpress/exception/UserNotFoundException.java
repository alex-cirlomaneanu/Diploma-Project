package com.example.homebookexpress.exception;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String userEmail) {
        super("User with name " + userEmail + " not found");
    }

    public UserNotFoundException(UUID userId) {
        super("User with id " + userId + " not found");
    }
}
