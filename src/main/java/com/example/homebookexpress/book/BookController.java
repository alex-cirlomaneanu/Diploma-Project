package com.example.homebookexpress.book;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@AllArgsConstructor
@RequestMapping(path = "/api/v1/book")
public class BookController {
    private final BookService bookService;


    @PostMapping("/addbook")
    @Secured(value = "ADMIN")
    public ResponseEntity<Book> addBook(
            @RequestBody BookRequest bookRequest
    ) throws Exception {
        return ResponseEntity.ok(bookService.addBook(bookRequest));
    }



}
