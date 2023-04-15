package com.example.homebookexpress.book;

import com.example.homebookexpress.authors.Author;
import com.example.homebookexpress.authors.AuthorRepository;
import com.example.homebookexpress.bookgenre.BookGenre;
import com.example.homebookexpress.bookgenre.BookGenreRepository;
import com.example.homebookexpress.exception.BookNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final BookGenreRepository genreRepository;

    public Book getBookByBookId(UUID id) {
        return bookRepository.getBookByBookId(id)
                .orElseThrow(() -> new BookNotFoundException(id.toString()));
    }

    public Book getBookByTitle(String title) {
        return bookRepository.getBookByTitle(title)
                .orElseThrow(() -> new BookNotFoundException(title));
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book addBook(BookRequest bookRequest) throws BookNotFoundException {
        Optional<Author> author;
        author = authorRepository.getAuthorByAuthorName(bookRequest.getAuthorName());

        if (author.isEmpty()) {
            throw new BookNotFoundException(bookRequest.getAuthorName());
        }

        List<String> bookGenreName = bookRequest.getGenreName();
        List<BookGenre> bookGenre = genreRepository.getBookGenreByGenreNameIn(bookGenreName);

        Book book = new Book(bookRequest, author.get(), bookGenre);

        bookRepository.save(book);

        return book;
    }

    public Book deleteBook(UUID bookId) throws BookNotFoundException {
        Book book = bookRepository.getBookByBookId(bookId)
                .orElseThrow(() -> new BookNotFoundException(bookId.toString()));

        bookRepository.delete(book);

        return book;
    }

    public Book updateBook(BookRequest bookRequest) throws BookNotFoundException {
        Book book = bookRepository.getBookByTitle(bookRequest.getTitle())
                .orElseThrow(() -> new BookNotFoundException(bookRequest.getTitle()));

        bookRepository.save(book);

        return book;
    }
}
