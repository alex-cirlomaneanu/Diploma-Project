package com.example.homebookexpress.bookgenre;

import com.example.homebookexpress.book.Book;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "book_genre")
@Getter @Setter @ToString @EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "book_genre")
public class BookGenre {
    @Id
    @GeneratedValue
    @Column(name = "genre_id")
    private UUID genreId;
    @Column(
            name = "genre_name",
            nullable = false,
            unique = true,
            columnDefinition = "varchar(20)"
    )
    private String genreName;

    @ManyToMany(mappedBy = "bookGenres")
    @JsonIgnore
    private List<Book> books = new ArrayList<>();
}
