package com.example.homebookexpress.rental;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AdminRentalDTO {
    private String title;
    private String userEmail;
    private LocalDate rentalDate;
    private LocalDate returnDate;
    private Boolean status;
}
