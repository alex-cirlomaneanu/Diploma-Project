package com.example.homebookexpress.rental;

import com.example.homebookexpress.appuser.AppUser;
import com.example.homebookexpress.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RentalRepository extends JpaRepository<Rental, UUID> {
    Optional<Rental> getRentalByRentalId(UUID rentalId);

    Optional<Rental> getRentalByUserAndBookAndReturnedStatus(
            AppUser appUser, Book book, boolean returnedStatus);
}
