package com.example.homebookexpress.bookgenre;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookGenreRepository extends JpaRepository<BookGenre, UUID> {
    Optional<BookGenre> getBookGenreByGenreName(String name);

    List<BookGenre> getBookGenreByGenreNameIn(List<String> bookGenreName);
}
