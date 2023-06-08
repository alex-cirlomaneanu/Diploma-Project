package com.example.homebookexpress.appuser;

import java.time.LocalDate;

public interface RentalProjection {
    String getTitle();
    LocalDate getRentalDate();
    LocalDate getReturnDate();
}
