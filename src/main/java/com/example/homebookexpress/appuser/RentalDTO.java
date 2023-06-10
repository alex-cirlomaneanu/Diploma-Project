package com.example.homebookexpress.appuser;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;

@Data
public class RentalDTO {
    private String title;
    private LocalDate rentalDate;
    private LocalDate returnDate;
    private Boolean status;
}
