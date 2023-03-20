package com.example.homebookexpress.book;

import com.example.homebookexpress.authors.Author;
import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity(name = "books")
@Data
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

    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "author_id", referencedColumnName = "author_id")
    private Author author;

    @Column(
            name = "genre",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String genre;

}
