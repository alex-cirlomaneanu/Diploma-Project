package com.example.homebookexpress.rental;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@Controller
@AllArgsConstructor
@RequestMapping(path = "/api/v1/rentals")
@SecurityRequirement(name = "Bearer Authentication")
public class RentalController {
    @Autowired
    private RentalService rentalService;

    @PostMapping("/rent-book")
    @Secured(value = "USER")
    public ResponseEntity<Rental> rentBook(@RequestBody RentRequest rentRequest) {
        Rental rental = rentalService.rentBook(rentRequest);
        return ResponseEntity.ok(rental);
    }

    @PostMapping("/return-book")
    @Secured(value = "USER")
    public ResponseEntity<Rental> returnBook(@RequestBody RentRequest rentRequest) {
        Rental rental = rentalService.returnBook(rentRequest);
        return ResponseEntity.ok(rental);
    }

}
