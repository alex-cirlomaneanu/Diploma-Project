package com.example.homebookexpress.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
    Optional<Book> getBookByBookId(UUID id);
    Optional<Book> getBookByTitle(String title);

    @Query("SELECT b FROM books b WHERE b.title ILIKE %?1%")
    List<Book> getBooksByTitleLike(String title);

    @Query("SELECT b FROM books b LEFT JOIN rental r ON b.bookId = r.book.bookId GROUP BY b.bookId ORDER BY COUNT(r.rentalId) DESC limit 12")
    List<Book> getPopularBooks();
}
