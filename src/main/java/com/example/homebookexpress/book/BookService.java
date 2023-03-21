package com.example.homebookexpress.book;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.UUID;

@Service
@AllArgsConstructor
public class BookService {
    private final BookRepository bookRepository;

    public Book getBookByBookId(UUID id) {
        return bookRepository.getBookByBookId(id).orElseThrow();
    }

    public Book getBookByTitle(String title) {
        return bookRepository.getBookByTitle(title).orElseThrow();
    }

    public Book addBook(Book book) {
        Book newBook = Book.builder()
                .title(book.getTitle())
                .author(book.getAuthor())
                .genre(book.getGenre())
                .build();
        bookRepository.save(book);
        return newBook;
    }
}
