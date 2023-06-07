package com.example.homebookexpress.rental;

import com.example.homebookexpress.exception.BookAlreadyRentedException;
import com.example.homebookexpress.exception.BookNotAvailableException;
import com.example.homebookexpress.exception.BookNotFoundException;
import com.example.homebookexpress.exception.RentalNotFound;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Controller
@AllArgsConstructor
@RequestMapping(path = "/api/v1/rentals")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RentalController {
    private RentalService rentalService;

    @PostMapping("/rent-book")
    @Secured(value = "USER")
    public ResponseEntity<?> rentBook(@RequestBody RentRequest rentRequest) {
        try {
            Rental rental = rentalService.rentBook(rentRequest);
            return ResponseEntity.ok(rental);
        } catch (BookNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (BookAlreadyRentedException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (BookNotAvailableException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @PostMapping("/return-book")
    @Secured(value = "USER")
    public ResponseEntity<Rental> returnBook(@RequestBody RentRequest rentRequest) {
        Rental rental = rentalService.returnBook(rentRequest);
        return ResponseEntity.ok(rental);
    }

    @GetMapping("/get-rental")
    public ResponseEntity<?> getRental(@RequestParam String userEmail, @RequestParam String bookTitle) {
        try {
            Rental rental = rentalService.getRentalByUserEmailAndBookTitle(userEmail, bookTitle);
            return ResponseEntity.ok(rental);
        } catch (RentalNotFound e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/get-rentals-by-user")
    public ResponseEntity<?> getRentalsByUser(@RequestParam String userEmail) {
        try {
            return ResponseEntity.ok(rentalService.getRentalsByUserEmail(userEmail));
        } catch (RentalNotFound e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
