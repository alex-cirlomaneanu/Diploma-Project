package com.example.homebookexpress.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookRequest {
    private String title;
    private int totalCopies;
    private String authorName;
    private String genreName;
}
