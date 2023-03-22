package com.example.homebookexpress.bookgenre;

import jakarta.persistence.*;
import lombok.*;

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
}
