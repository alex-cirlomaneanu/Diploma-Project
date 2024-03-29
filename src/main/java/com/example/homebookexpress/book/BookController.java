package com.example.homebookexpress.book;

import com.example.homebookexpress.exception.BookNotFoundException;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@Controller
@AllArgsConstructor
@RequestMapping(path = "/api/v1/book")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BookController {
    private final BookService bookService;

    @PostMapping("/addbook")
    @Secured(value = "ADMIN")
    public ResponseEntity<Book> addBook(
            @RequestBody BookRequest bookRequest
    ) {
        return ResponseEntity.ok(bookService.addBook(bookRequest));
    }

    @DeleteMapping("/deletebook")
    @Secured(value = "ADMIN")
    @Transactional
    public ResponseEntity<Book> deleteBook(
            @RequestParam("bookId") UUID bookId
    ) throws BookNotFoundException {
        return ResponseEntity.ok(bookService.deleteBook(bookId));
    }

    @GetMapping("/getallbooks")
    public ResponseEntity<Iterable<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/getbookbytitle")
    @Secured(value = {"ADMIN", "USER"})
    public ResponseEntity<Book> getBookByTitle(
            @RequestParam("bookTitle") String bookTitle
    ) throws BookNotFoundException {
        return ResponseEntity.ok(bookService.getBookByTitle(bookTitle));
    }

    @GetMapping("/getbookbyid/{bookId}")
    @Secured(value = {"ADMIN", "USER"})
    public ResponseEntity<Book> getBookById(
            @PathVariable @RequestParam("bookId") UUID bookId
    ) throws BookNotFoundException {
        return ResponseEntity.ok(bookService.getBookByBookId(bookId));
    }

    @PutMapping("/updatebook")
    @Secured(value = "ADMIN")
    public ResponseEntity<Book> updateBook(
            @RequestBody BookRequest bookRequest
    ) throws BookNotFoundException {
        return ResponseEntity.ok(bookService.updateBook(bookRequest));
    }

    @GetMapping("/getbooksbytitlelike")
    public ResponseEntity<Iterable> getBooksByTitleLike(
            @RequestParam("bookTitle") String bookTitle
    ) {
        return ResponseEntity.ok(bookService.getBooksByTitleLike(bookTitle));
    }

    @GetMapping("/findsimilarbooks")
    @Secured(value = {"ADMIN", "USER"})
    public ResponseEntity<Iterable> findSimilarBooks(
            @RequestParam("bookId") UUID bookId
    ) throws BookNotFoundException {
        return ResponseEntity.ok(bookService.findSimilarBooks(bookId));
    }
}
