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
            unique = true,
            columnDefinition = "TEXT"
    )
    private String title;
    
    @Column(
            name = "book_image",
            columnDefinition = "TEXT"
    )
    private String bookImage;

    @Column(name = "total_copies", nullable = false)
    private int totalCopies;

    @Column(name = "available_copies", nullable = false)
    private int availableCopies;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "author_id", referencedColumnName = "author_id")
    private Author author;


    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST,CascadeType.REFRESH})
    @JoinColumn(name = "book_id", referencedColumnName = "genre_id")
    private List<BookGenre> bookGenres;

    @OneToMany(mappedBy = "book", cascade = {CascadeType.MERGE, CascadeType.PERSIST,CascadeType.REFRESH})
    private List<Rental> rentals = new ArrayList<>();
}
