package com.example.homebookexpress.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@EqualsAndHashCode @ToString
public class AppUserDto {
    private final String firstName;
    private final String lastName;
    private final LocalDate birthDate;
    private final String phone;
    private final String email;
    private final String password;

}
