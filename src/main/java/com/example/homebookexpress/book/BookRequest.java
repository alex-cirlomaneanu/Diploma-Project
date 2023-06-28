package com.example.homebookexpress.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookRequest {
    private UUID bookId;
    private String title;
    private String bookImage;
    private int totalCopies;
    private String authorName;
    private List<String> genreName;
}
