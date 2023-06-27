package com.example.homebookexpress.bookgenre;

import com.example.homebookexpress.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookGenreRepository extends JpaRepository<BookGenre, UUID> {

    @Query(value = """
        Select b
        From books b
        where exists (
            select 1
            from book_genre bg
            join bg.books bb
            where bb.bookId = b.bookId
            and bg.genreName = ?1
        )
   """)
    List<Book> getAllBooksByGenreName(String genreName);
    List<BookGenre> getBookGenreByGenreNameIn(List<String> bookGenreName);

    Optional<BookGenre> findBookGenreByGenreName(String bookGenreName);
}
