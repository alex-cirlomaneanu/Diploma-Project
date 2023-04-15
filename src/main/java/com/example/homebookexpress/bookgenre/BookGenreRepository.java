package com.example.homebookexpress.bookgenre;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookGenreRepository extends JpaRepository<BookGenre, UUID> {

    @Query(
            value = "SELECT b.title " +
                    "FROM homebook.book_genre bg," +
                    "homebook.books b," +
                    "homebook.books_book_genres bbg " +
                    "WHERE bg.genre_name = ?1 " +
                    "AND bbg.book_genres_genre_id=bg.genre_id " +
                    "AND bbg.books_book_id=b.book_id",
            nativeQuery = true
    )
    List<String> getAllBooksByGenreName(String genreName);
    List<BookGenre> getBookGenreByGenreNameIn(List<String> bookGenreName);
}
