package com.example.homebookexpress.appuser;


import com.example.homebookexpress.book.Book;
import com.example.homebookexpress.exception.UserNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, UUID> {
    Optional<AppUser> getAppUserByEmail(String email);

    Optional<AppUser> getAppUserByUserId(UUID userId);

    @Query(value = """
                SELECT b.*
                FROM homebook.books b, homebook.rental r
                WHERE r.book_id = b.book_id
                AND r.user_id = ?1
            """,
            nativeQuery = true)
    List<Book> getBookHistoryByUserId(UUID userId);

    AppUser getUserNameByEmail(String email);

    @Query(value = """
                SELECT b.title, r.rental_date as rentalDate,
                r.return_date as returnDate, r.returned_status as status
                FROM homebook.rental r, homebook.app_users u, homebook.books b
                WHERE r.user_id = u.user_id
                AND r.book_id = b.book_id
                AND r.user_id = ?
                ORDER BY r.return_date DESC, r.returned_status ASC
            """,
            nativeQuery = true)
    List<RentalProjection> getRentalsByUserId(UUID userId);

    default void changePassword(UUID userId, String newPassword) {
        AppUser appUser = getAppUserByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
        appUser.setPassword(newPassword);
        save(appUser);
    }
}
