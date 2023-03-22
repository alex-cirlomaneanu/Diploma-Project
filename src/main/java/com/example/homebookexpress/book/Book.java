package com.example.homebookexpress.book;

import com.example.homebookexpress.authors.Author;
import com.example.homebookexpress.bookgenre.BookGenre;
import com.example.homebookexpress.rename.Rental;
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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id", referencedColumnName = "author_id")
    private Author author;


    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "book_genre_id", referencedColumnName = "genre_id")
    private BookGenre bookGenre;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<Rental> rentals = new ArrayList<>();

    public Book(String title, Author author, BookGenre bookGenre) {
        this.bookId = UUID.randomUUID();
        this.title = title;
        this.author = author;
        this.bookGenre = bookGenre;
    }
}
