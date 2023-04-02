package com.example.homebookexpress.rental;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RentRequest {
    private String bookTitle;
    private String userEmail;
}
