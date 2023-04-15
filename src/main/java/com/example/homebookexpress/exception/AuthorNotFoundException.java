package com.example.homebookexpress.exception;

public class AuthorNotFoundException extends RuntimeException {
    public AuthorNotFoundException(String name) {
        super("Author with name " + name + " not found");
    }
}
