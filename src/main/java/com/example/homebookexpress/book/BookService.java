package com.example.homebookexpress.book;

import com.example.homebookexpress.authors.Author;
import com.example.homebookexpress.authors.AuthorRepository;
import com.example.homebookexpress.bookgenre.BookGenre;
import com.example.homebookexpress.bookgenre.BookGenreRepository;
import com.example.homebookexpress.exception.BookNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final BookGenreRepository genreRepository;

    public Book getBookByBookId(UUID id) {
        return bookRepository.getBookByBookId(id).orElseThrow();
    }

    public Book getBookByTitle(String title) {
        return bookRepository.getBookByTitle(title).orElseThrow();
    }

    public Book addBook(BookRequest bookRequest) throws BookNotFoundException {
        Author author = authorRepository.getAuthorByAuthorName(bookRequest.getAuthorName())
                .orElseThrow();

        BookGenre bookGenre = genreRepository.getBookGenreByGenreName(bookRequest.getGenreName())
                .orElseThrow();

        Book book = new Book(bookRequest, author, bookGenre);

        bookRepository.save(book);

        return book;
    }

    public Book deleteBook(BookRequest bookRequest) throws BookNotFoundException {
        Book book = bookRepository.getBookByTitle(bookRequest.getTitle()).orElseThrow();

        bookRepository.delete(book);

        return book;
    }

    public Book updateBook(BookRequest bookRequest) throws BookNotFoundException {
        Book book = bookRepository.getBookByTitle(bookRequest.getTitle()).orElseThrow();

        bookRepository.save(book);

        return book;
    }
}
