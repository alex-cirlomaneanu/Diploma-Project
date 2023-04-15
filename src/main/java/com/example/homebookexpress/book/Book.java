package com.example.homebookexpress.book;

import com.example.homebookexpress.authors.Author;
import com.example.homebookexpress.bookgenre.BookGenre;
import com.example.homebookexpress.rental.Rental;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "books")
@Getter @Setter @ToString @EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue
    @Column(name = "book_id")
    private UUID bookId;

    @Column(
            name = "title",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String title;

    @Column(name = "total_copies")
    private int totalCopies;

    @Column(name = "available_copies")
    private int availableCopies;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id", referencedColumnName = "author_id")
    private Author author;


    @ManyToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "book_id", referencedColumnName = "genre_id")
    private List<BookGenre> bookGenres;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<Rental> rentals = new ArrayList<>();

    public Book(BookRequest bookRequest, Author author, List<BookGenre> genre) {
        this.bookId = UUID.randomUUID();
        this.title = bookRequest.getTitle();
        this.totalCopies = bookRequest.getTotalCopies();
        this.availableCopies = bookRequest.getTotalCopies();
        this.author = author;
        this.bookGenres = genre;
    }
}
