package com.example.homebookexpress.authors;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity(name = "authors")
@Getter @Setter @ToString @EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "authors")
public class Author {
    @Id
    @GeneratedValue
    @Column(name = "author_id")
    private UUID authorId;

    @Column(
            name = "author_name",
            nullable = false,
            unique = true,
            columnDefinition = "TEXT"
    )
    private String authorName;


}
