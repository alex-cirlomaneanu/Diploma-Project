package com.example.homebookexpress.rental;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@AllArgsConstructor
@RequestMapping
public class RentalController {
    @Autowired
    private RentalService rentalService;

    @PostMapping("/rent-book")
    @PreAuthorize("hasRole('USER')")
    public Rental rentBook() {
//        return rentalService.rentBook();
        return null;
    }

}
