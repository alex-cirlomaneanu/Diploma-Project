package com.example.homebookexpress.bookgenre;

import com.example.homebookexpress.exception.BookGenreNotFound;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BookGenreService {
    private final BookGenreRepository bookGenreRepository;

    public void addBookGenre(String bookGenreName) {
        BookGenre bookGenre = BookGenre.builder()
                .genreName(bookGenreName)
                .build();
        bookGenreRepository.save(bookGenre);
    }

    public List<String> getAllBooksByGenreName(String genreName) {
        return bookGenreRepository.getAllBooksByGenreName(genreName);
    }

    public void deleteBookGenre(String bookGenreName) {
        BookGenre bookGenre = bookGenreRepository.findBookGenreByGenreName(bookGenreName)
                .orElseThrow(() -> new BookGenreNotFound(bookGenreName));
        bookGenreRepository.delete(bookGenre);
    }


    public void updateBookGenre(String bookGenreName, String newBookGenreName) {
        if (bookGenreRepository.findBookGenreByGenreName(newBookGenreName).isPresent()) {
            throw new IllegalStateException("Book genre name already taken");
        }

        BookGenre bookGenre = bookGenreRepository.findBookGenreByGenreName(bookGenreName)
                .orElseThrow(() -> new BookGenreNotFound(bookGenreName));

        bookGenre.setGenreName(newBookGenreName);
        bookGenreRepository.save(bookGenre);
    }

    public BookGenre getBookGenreByGenreName(String bookGenreName) {
        return bookGenreRepository.findBookGenreByGenreName(bookGenreName)
                .orElseThrow(() -> new BookGenreNotFound(bookGenreName));
    }

    public List<BookGenre> getAllBookGenres() {
        return bookGenreRepository.findAll();
    }
}
