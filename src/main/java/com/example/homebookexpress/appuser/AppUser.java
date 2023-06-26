package com.example.homebookexpress.appuser;

import com.example.homebookexpress.rental.Rental;
import com.example.homebookexpress.token.Token;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.*;

@Entity(name = "app_users")
@Getter @Setter @EqualsAndHashCode
@Builder
@NoArgsConstructor @AllArgsConstructor
@Table(name = "app_users")
public class AppUser implements UserDetails {
    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private UUID userId;

    @Column(
            name = "firstname",
            nullable = false,
            columnDefinition = "VARCHAR(255)"
    )
    private String firstname;

    @Column(
            name = "lastname",
            nullable = false,
            columnDefinition = "VARCHAR(255)"
    )
    private String lastname;

    @Column(
            name = "email",
            nullable = false,
            unique = true,
            columnDefinition = "VARCHAR(255)"
    )
    private String email;

    @Column(
            name = "password",
            nullable = false,
            columnDefinition = "VARCHAR(255)"
    )
    private String password;

    @Column(
            name = "phone_number",
            nullable = false,
            columnDefinition = "VARCHAR(255)"
    )
    private String phoneNumber;

    @Column(
            name = "birth_date",
            nullable = false,
            columnDefinition = "DATE"
    )
    private LocalDate birthDate;

    @Column(
            name = "address",
            nullable = false,
            columnDefinition = "VARCHAR(255)"
    )
    private String address;

    @Column(
            name = "bank_account",
            nullable = false,
            columnDefinition = "VARCHAR(255)"
    )
    private String bankAccount;

    @Enumerated(EnumType.STRING)
    private AppUserRole role;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.MERGE, CascadeType.PERSIST,CascadeType.REFRESH})
    private List<Rental> rentals = new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Token> tokens = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.name());
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
