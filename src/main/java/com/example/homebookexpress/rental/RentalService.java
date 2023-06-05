package com.example.homebookexpress.rental;

import com.example.homebookexpress.appuser.AppUser;
import com.example.homebookexpress.appuser.AppUserRepository;
import com.example.homebookexpress.book.Book;
import com.example.homebookexpress.book.BookRepository;
import com.example.homebookexpress.exception.BookAlreadyRentedException;
import com.example.homebookexpress.exception.BookNotAvailableException;
import com.example.homebookexpress.exception.BookNotFoundException;
import com.example.homebookexpress.exception.RentalNotFound;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@AllArgsConstructor
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    public Rental rentBook(RentRequest rentRequest) {
        String bookTitle = rentRequest.getBookTitle();
        String userEmail = rentRequest.getUserEmail();
        Book book = bookRepository.getBookByTitle(bookTitle)
                .orElseThrow(() -> new BookNotFoundException(bookTitle));
        AppUser appUser = appUserRepository.getAppUserByEmail(userEmail)
                .orElseThrow(() -> new BookNotFoundException(userEmail));
        Optional<Rental> existingRental = rentalRepository
                .getRentalByUserAndBookAndReturnedStatus(appUser, book ,false);

        if (existingRental.isPresent()) {
            throw new BookAlreadyRentedException(userEmail, bookTitle);
        }

        if (book.getAvailableCopies() <= 0) {
            throw new BookNotAvailableException(bookTitle);
        }

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);

        Rental rental = new Rental();
        rental.setBook(book);
        rental.setUser(appUser);
        rental.setRentalDate(LocalDate.now());
        rental.setReturnDate(LocalDate.now().plusDays(30));
        rental.setReturnedStatus(false);

        return rentalRepository.save(rental);
    }

    public Rental returnBook(RentRequest rentRequest) {
        String bookTitle = rentRequest.getBookTitle();
        String userEmail = rentRequest.getUserEmail();
        Book book = bookRepository.getBookByTitle(bookTitle)
                .orElseThrow(() -> new BookNotFoundException(bookTitle));
        AppUser appUser = appUserRepository.getAppUserByEmail(userEmail)
                .orElseThrow(() -> new BookNotFoundException(userEmail));
        Rental rental = rentalRepository.getRentalByUserAndBookAndReturnedStatus(appUser, book, false)
                .orElseThrow(() -> new RentalNotFound(userEmail, bookTitle));

        book.setAvailableCopies(book.getAvailableCopies() + 1);
        rental.setReturnedStatus(true);
        return rentalRepository.save(rental);
    }

    public Rental getRentalByUserEmailAndBookTitle(String userEmail, String bookTitle) {
        Optional rental = rentalRepository.getRentalByUserEmailAndBookTitle(userEmail, bookTitle);
        if (rental.isEmpty()) {
            throw new RentalNotFound(userEmail, bookTitle);
        } else {
            return (Rental) rental.get();
        }
    }
}

