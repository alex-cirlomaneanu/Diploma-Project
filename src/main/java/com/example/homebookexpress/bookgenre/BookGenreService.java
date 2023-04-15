package com.example.homebookexpress.bookgenre;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class BookGenreService {
    private final BookGenreRepository bookGenreRepository;

    public BookGenre getBookGenreByName(String name) {
        return bookGenreRepository.getBookGenreByGenreName(name)
                .orElseThrow();
    }

    public void addBookGenre(String bookGenreName) {
        BookGenre bookGenre = new BookGenre(UUID.randomUUID(), bookGenreName);
        bookGenreRepository.save(bookGenre);
    }
}
