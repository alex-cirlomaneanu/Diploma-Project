package com.example.homebookexpress.book;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller
@AllArgsConstructor
@RequestMapping(path = "/api/v1")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PopularBookController {

    private BookService bookService;

    @GetMapping("/getpopularbooks")
    public ResponseEntity<Iterable> getPopularBooks() {
        return ResponseEntity.ok(bookService.getPopularBooks());
    }

}
