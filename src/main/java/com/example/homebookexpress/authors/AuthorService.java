package com.example.homebookexpress.authors;

import com.example.homebookexpress.exception.AuthorNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AuthorService {
    private final AuthorRepository authorRepository;

    public List<Author> getAuthors() {
        return authorRepository.findAll();
    }

    public Author getAuthorByName(String name) {
        return authorRepository.getAuthorByAuthorName(name)
                .orElseThrow(() -> new AuthorNotFoundException(name));
    }


}
