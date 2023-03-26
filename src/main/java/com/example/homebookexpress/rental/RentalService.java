package com.example.homebookexpress.rental;

import com.example.homebookexpress.appuser.AppUserRepository;
import com.example.homebookexpress.appuser.AppUserRole;
import com.example.homebookexpress.book.Book;
import com.example.homebookexpress.book.BookRepository;
import com.example.homebookexpress.exception.BookNotAvailableException;
import com.example.homebookexpress.exception.BookNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AppUserRepository appUserRepository;

    public Rental rentBook(UUID bookId, UUID userId) {
        Book book = bookRepository.getBookByBookId(bookId)
                .orElseThrow(() -> new BookNotFoundException(bookId.toString()));

        if (book.getAvailableCopies() <= 0) {
            throw new BookNotAvailableException(bookId.toString());
        }

        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);

        Rental rental = new Rental();
        rental.setBook(book);
        rental.setUser(appUserRepository.findAppUserByUserId(userId).orElseThrow());
        rental.setRentalDate(LocalDate.now());
        rental.setReturnDate(LocalDate.now().plusDays(303));
        rental.setReturnedStatus(false);

        return rentalRepository.save(rental);
    }
}

