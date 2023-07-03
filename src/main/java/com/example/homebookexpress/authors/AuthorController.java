package com.example.homebookexpress.authors;

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
@RequestMapping(path = "/api/v1/authors")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthorController {
    private final AuthorService authorService;
    @GetMapping("/getallauthors")
    public List<Author> getAllAuthors() {
        return authorService.getAllAuthors();
    }

    @PostMapping("/addauthor")
    @Secured(value = "ADMIN")
    public void addAuthor(@RequestBody String authorName) {
        String authorNameTrimmed = authorName.split(":")[1]
                .replace("\"", "").replace("}", "");
        authorService.addAuthor(authorNameTrimmed);
    }

    @DeleteMapping("/deleteauthor")
    @Secured(value = "ADMIN")
    public void deleteAuthor(@RequestParam("authorName") String authorName) {
        authorService.deleteAuthor(authorName);
    }

    @GetMapping("/getallbooksbyauthorname")
    public List<Book> getAllBooksByAuthorName(@RequestParam("authorName") String name) {
        return authorService.getAllBooksByAuthorName(name);
    }

    @PutMapping("/updateauthor")
    @Secured(value = "ADMIN")
    public void updateAuthor(String authorName, String newAuthorName) {
        authorService.updateAuthor(authorName, newAuthorName);
    }
}
