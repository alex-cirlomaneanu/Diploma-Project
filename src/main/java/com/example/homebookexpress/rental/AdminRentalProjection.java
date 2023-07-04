package com.example.homebookexpress.rental;

import java.time.LocalDate;


public interface AdminRentalProjection {
    String getTitle();
    String getEmail();
    LocalDate getRentalDate();
    LocalDate getReturnDate();
    Boolean getStatus();
}
