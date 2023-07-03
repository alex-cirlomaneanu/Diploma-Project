package com.example.homebookexpress.authors;

import com.example.homebookexpress.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AuthorRepository extends JpaRepository<Author, UUID> {
    Optional<Author> getAuthorByAuthorName(String name);
    List<Author> findAll();
    @Query(
            value = "SELECT b FROM authors a " +
                    "INNER JOIN books b ON a.authorId = b.author.authorId " +
                    "WHERE b.author.authorId = a.authorId AND a.authorName = ?1"
    )
    List<Book> getAllBooksByAuthorName(String name);



}
