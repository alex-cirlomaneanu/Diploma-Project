package com.example.homebookexpress.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
    Optional<Book> getBookByBookId(UUID id);

    Optional<Book> getBookByTitle(String title);
}
