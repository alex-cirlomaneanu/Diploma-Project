package com.example.homebookexpress.auth;

import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String firstname;
    private String lastname;
    private String phoneNumber;
    private LocalDate birthDate;
}
