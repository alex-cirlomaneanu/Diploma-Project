package com.example.homebookexpress.appuser;

import lombok.Data;

import java.time.LocalDate;

@Data
public class RentalDTO {
    private String title;
    private LocalDate rentalDate;
    private LocalDate returnDate;
    private Boolean status;
}
