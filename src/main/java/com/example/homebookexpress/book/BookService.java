package com.example.homebookexpress.book;

import com.example.homebookexpress.authors.Author;
import com.example.homebookexpress.authors.AuthorRepository;
import com.example.homebookexpress.bookgenre.BookGenre;
import com.example.homebookexpress.bookgenre.BookGenreRepository;
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

    public Book addBook(BookRequest bookRequest) throws Exception {
        Author author = authorRepository.getAuthorByAuthorName(bookRequest.getAuthorName())
                .orElseThrow();

        BookGenre bookGenre = genreRepository.getBookGenreByGenreName(bookRequest.getGenreName())
                .orElseThrow();

        Book book = new Book(bookRequest, author, bookGenre);

        bookRepository.save(book);

        return book;
    }
}
