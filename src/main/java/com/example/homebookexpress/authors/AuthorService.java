package com.example.homebookexpress.authors;

import com.example.homebookexpress.exception.AuthorNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AuthorService {
    private final AuthorRepository authorRepository;

    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    public void addAuthor(String authorName) {
        Author author = Author.builder()
                .authorName(authorName)
                .build();
        authorRepository.save(author);
    }

    public void deleteAuthor(String authorName) {
        Author author = authorRepository.getAuthorByAuthorName(authorName)
                .orElseThrow(() -> new AuthorNotFoundException(authorName));
        authorRepository.delete(author);
    }

    public List<String> getAllBooksByAuthorName(String name) {
        return authorRepository.getAllBooksByAuthorName(name);
    }

    public void updateAuthor(String authorName, String newAuthorName) {
        Author author = authorRepository.getAuthorByAuthorName(authorName)
                .orElseThrow(() -> new AuthorNotFoundException(authorName));
        author.setAuthorName(newAuthorName);
        authorRepository.save(author);
    }
}
