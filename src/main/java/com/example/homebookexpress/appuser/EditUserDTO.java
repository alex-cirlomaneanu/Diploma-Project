package com.example.homebookexpress.appuser;

import lombok.Data;

import java.time.LocalDate;
import java.util.UUID;

@Data
public class EditUserDTO {
    private UUID userId;
    private String email;

    private String firstname;
    private String lastname;
    private String phoneNumber;
    private LocalDate birthDate;
    private String address;
    private String bankAccount;
}
