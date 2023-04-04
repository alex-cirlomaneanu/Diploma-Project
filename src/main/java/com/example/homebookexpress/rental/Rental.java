package com.example.homebookexpress.rental;

import com.example.homebookexpress.appuser.AppUser;
import com.example.homebookexpress.book.Book;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity(name = "rental")
@Getter @Setter @ToString @EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "rental")
public class Rental {
    @Id
    @GeneratedValue
    @Column(name = "rental_id")
    private UUID rentalId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private AppUser user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    private Book book;

    @Column(name = "rental_date")
    private LocalDate rentalDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

    @Column(name = "returned_status")
    private boolean returnedStatus;
}
