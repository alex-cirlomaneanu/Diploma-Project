package com.example.homebookexpress.book;

import com.example.homebookexpress.exception.BookNotFoundException;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@Controller
@AllArgsConstructor
@RequestMapping(path = "/api/v1/book")
@SecurityRequirement(name = "Bearer Authentication")
public class BookController {
    private final BookService bookService;


    @PostMapping("/addbook")
    @Secured(value = "ADMIN")
    public ResponseEntity<Book> addBook(
            @RequestBody BookRequest bookRequest
    ) throws Exception {
        return ResponseEntity.ok(bookService.addBook(bookRequest));
    }

    @DeleteMapping("/deletebook")
    @Secured(value = "ADMIN")
    public ResponseEntity<Book> deleteBook(
            @RequestBody BookRequest bookRequest
    ) throws BookNotFoundException {
        return ResponseEntity.ok(bookService.deleteBook(bookRequest));
    }

    @PostMapping("/getbookbytitle")
    @Secured(value = {"ADMIN", "USER"})
    public ResponseEntity<Book> getBookByTitle(
            @RequestBody BookRequest bookRequest
    ) throws BookNotFoundException {
        return ResponseEntity.ok(bookService.getBookByTitle(bookRequest.getTitle()));
    }

    @PutMapping("/updatebook")
    @Secured(value = "ADMIN")
    public ResponseEntity<Book> updateBook(
            @RequestBody BookRequest bookRequest
    ) throws BookNotFoundException {
        return ResponseEntity.ok(bookService.updateBook(bookRequest));
    }
}
