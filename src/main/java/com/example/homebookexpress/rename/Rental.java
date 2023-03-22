package com.example.homebookexpress.rename;

import com.example.homebookexpress.appuser.AppUser;
import com.example.homebookexpress.book.Book;
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
    private UUID rentalId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
//    @Column(name = "user_id")
    private AppUser user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
//    @Column(name = "book_id")
    private Book book;

    @Column(name = "rental_date")
    private LocalDate rentalDate;

    @Column(name = "return_date")
    private LocalDate returnDate;

}
