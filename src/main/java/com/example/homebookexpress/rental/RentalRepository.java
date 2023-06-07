package com.example.homebookexpress.rental;

import com.example.homebookexpress.appuser.AppUser;
import com.example.homebookexpress.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

    @Query(
            "SELECT r from " +
                    "rental r, books b, app_users u " +
                    "WHERE r.book.bookId = b.bookId " +
                    "AND b.title = ?2 " +
                    "AND r.user.userId = u.userId " +
                    "AND u.email = ?1 " +
                    "AND r.returnedStatus = false"
    )
    Optional<Rental> getRentalByUserEmailAndBookTitle(String userEmail, String bookTitle);

    @Query(
            "SELECT b from " +
                    "rental r, books b, app_users u " +
                    "WHERE r.book.bookId = b.bookId " +
                    "AND r.user.userId = u.userId " +
                    "AND u.email = ?1 "
    )
    List<Book> getRentalsByUserEmail(String userEmail);
}
