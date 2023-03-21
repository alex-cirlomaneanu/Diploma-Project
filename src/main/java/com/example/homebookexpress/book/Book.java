package com.example.homebookexpress.book;

import com.example.homebookexpress.authors.Author;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity(name = "books")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue
    private UUID bookId;

    @Column(
            name = "title",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String title;

//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "author_id", referencedColumnName = "author_id")
    private String author;

    @Column(
            name = "genre",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String genre;

    public Book(String title, String author, String genre) {
        this.bookId = UUID.randomUUID();
        this.title = title;
        this.author = author;
        this.genre = genre;
    }
}
