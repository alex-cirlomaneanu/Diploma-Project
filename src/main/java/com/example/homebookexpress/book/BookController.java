package com.example.homebookexpress.book;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@AllArgsConstructor
@RequestMapping(path = "/api/v1/book")
public class BookController {
    private final BookService bookService;

    @PostMapping("/addbook")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Book> addBook(
            @RequestBody BookRequest bookRequest
    ) throws Exception {
        return ResponseEntity.ok(bookService.addBook(bookRequest));
    }

    @GetMapping("/hello")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello from secured endpoint");
    }

}
