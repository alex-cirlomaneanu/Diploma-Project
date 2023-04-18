package com.example.homebookexpress.authors;

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
            value = "SELECT b.title FROM homebook.authors a " +
                    "INNER JOIN homebook.books b ON a.author_id = b.author_id " +
                    "WHERE b.author_id = a.author_id AND a.author_name = ?1",
            nativeQuery = true
    )
    List<String> getAllBooksByAuthorName(String name);

}
