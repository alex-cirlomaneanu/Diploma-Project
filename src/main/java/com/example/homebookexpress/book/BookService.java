package com.example.homebookexpress.book;

import com.example.homebookexpress.authors.Author;
import com.example.homebookexpress.authors.AuthorRepository;
import com.example.homebookexpress.bookgenre.BookGenre;
import com.example.homebookexpress.bookgenre.BookGenreRepository;
import com.example.homebookexpress.exception.AuthorNotFoundException;
import com.example.homebookexpress.exception.BookNotFoundException;
import com.example.homebookexpress.rental.Rental;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
                .orElseThrow(() -> new BookNotFoundException(id));
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
            throw new AuthorNotFoundException(bookRequest.getAuthorName());
        }


        List<String> bookGenreName = bookRequest.getGenreName();
        List<BookGenre> bookGenre = genreRepository.getBookGenreByGenreNameIn(bookGenreName);

        Book book = Book.builder()
                .title(bookRequest.getTitle())
                .bookImage(bookRequest.getBookImage())
                .totalCopies(bookRequest.getTotalCopies())
                .availableCopies(bookRequest.getTotalCopies())
                .author(author.get())
                .bookGenres(bookGenre)
                .build();

        bookRepository.save(book);

        return book;
    }

    public Book deleteBook(UUID bookId) throws BookNotFoundException {
        Book book = bookRepository.getBookByBookId(bookId)
                .orElseThrow(() -> new BookNotFoundException(bookId));

        List<Rental> rentals = book.getRentals();
        for (Rental rental : rentals) {
            rental.setBook(null);
        }

        List<BookGenre> bookGenres = book.getBookGenres();
        for (BookGenre bookGenre : bookGenres) {
            bookGenre.getBooks().remove(book);
        }

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
