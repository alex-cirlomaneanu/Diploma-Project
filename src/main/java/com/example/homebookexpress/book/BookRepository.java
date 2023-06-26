package com.example.homebookexpress.book;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

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

    @Query(
           """
                    SELECT b
                    FROM books b
                    WHERE b.bookId IN (
                        SELECT b.bookId
                        FROM books b
                        WHERE b.bookId != ?1
                        AND b.author.authorId IN (
                            SELECT b.author.authorId
                            FROM books b
                            WHERE b.bookId = ?1
                        )
                    )
           """)
    List<Book> findSimilarBooks(UUID bookId, Pageable pageable);

    @Query(
            value = "SELECT b " +
                    "FROM books b " +
                    "LEFT JOIN rental r ON b.bookId = r.book.bookId " +
                    "WHERE EXISTS (" +
                    "SELECT 1 " +
                    "FROM book_genre bg " +
                    "JOIN bg.books bb " +
                    "WHERE bg.genreName = ?1 " +
                    "AND bb.bookId = b.bookId" +
                    ") " +
                    "GROUP BY b.bookId " +
                    "ORDER BY COUNT(r.rentalId) DESC " +
                    "LIMIT 12"
    )
    List<Book> getPopularBooksByGenre(String genreName);
}
