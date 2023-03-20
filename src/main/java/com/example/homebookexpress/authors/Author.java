package com.example.homebookexpress.authors;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "authors")
public class Author {
    @Id
    private UUID authorId;

    @Column(
//            name = "authorname",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String authorName;


}
