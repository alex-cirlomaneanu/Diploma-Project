package com.example.homebookexpress.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookRequest {
    private String title;
    private String bookImage;
    private int totalCopies;
    private String authorName;
    private List<String> genreName;
}
