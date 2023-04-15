package com.example.homebookexpress.bookgenre;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class BookGenreService {
    private final BookGenreRepository bookGenreRepository;

    public void addBookGenre(String bookGenreName) {
        BookGenre bookGenre = new BookGenre(UUID.randomUUID(), bookGenreName, new ArrayList<>());
        bookGenreRepository.save(bookGenre);
    }

    public List<String> getAllBooksByGenreName(String genreName) {
        return bookGenreRepository.getAllBooksByGenreName(genreName);
    }
}
