package com.example.homebookexpress.bookgenre;

import com.example.homebookexpress.book.Book;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Controller
@AllArgsConstructor
@RequestMapping(path = "/api/v1/bookgenre")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BookGenreController {
    private final BookGenreService bookGenreService;

    @PostMapping("/addbookgenre")
    @Secured(value = "ADMIN")
    public void addBookGenre(@RequestBody String bookGenreName) {
        String bookGenreNameWithoutQuotes = bookGenreName.split(":")[1]
                .replace("\"", "").replace("}", "");
        bookGenreService.addBookGenre(bookGenreNameWithoutQuotes);
    }

    @GetMapping("/getallbooksbygenrename")
    public List<Book> getAllBooksByGenreName(String genreName) {
        return bookGenreService.getAllBooksByGenreName(genreName);
    }

    @DeleteMapping("/deletebookgenre")
    @Secured(value = "ADMIN")
    public void deleteBookGenre(String bookGenreName) {
        bookGenreService.deleteBookGenre(bookGenreName);
    }

    @PutMapping("/updatebookgenre")
    @Secured(value = "ADMIN")
    public void updateBookGenre(String bookGenreName, String newBookGenreName) {
        bookGenreService.updateBookGenre(bookGenreName, newBookGenreName);
    }

    @GetMapping("/getbookgenrebygenrename")
    public BookGenre getBookGenreByGenreName(String bookGenreName) {
        return bookGenreService.getBookGenreByGenreName(bookGenreName);
    }

    @GetMapping("/getallbookgenres")
    public List<BookGenre> getAllBookGenres() {
        return bookGenreService.getAllBookGenres();
    }
}
