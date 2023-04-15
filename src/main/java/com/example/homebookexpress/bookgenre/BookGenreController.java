package com.example.homebookexpress.bookgenre;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller
@AllArgsConstructor
@RequestMapping(path = "/api/v1/bookgenre")
@SecurityRequirement(name = "Bearer Authentication")
public class BookGenreController {
    private final BookGenreService bookGenreService;

    @PostMapping("/addbookgenre")
    @Secured(value = "ADMIN")
    public void addBookGenre(String bookGenreName) {
        bookGenreService.addBookGenre(bookGenreName);
    }
}
