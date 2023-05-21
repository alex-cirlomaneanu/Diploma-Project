package com.example.homebookexpress.appuser;


import com.example.homebookexpress.book.Book;
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

    @Query(
            value = """
                SELECT b.title
                FROM homebook.books b, homebook.rental r
                WHERE r.book_id = b.book_id
                AND r.user_id = ?1
            """,
            nativeQuery = true
    )
    List<String> getBookHistoryByUserId(UUID userId);

    AppUser getUserNameByEmail(String email);
}
