package com.example.homebookexpress.appuser;

import com.example.homebookexpress.rental.Rental;
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
            columnDefinition = "VARCHAR(30)"
    )
    private String firstname;

    @Column(
            name = "lastname",
            nullable = false,
            columnDefinition = "VARCHAR(30)"
    )
    private String lastname;

    @Column(
            name = "email",
            nullable = false,
            columnDefinition = "VARCHAR(30)"
    )
    private String email;

    @Column(
            name = "password",
            nullable = false,
            columnDefinition = "VARCHAR(20)"
    )
    private String password;

    @Column(
            name = "phoneNumber",
            nullable = false,
            columnDefinition = "VARCHAR(20)"
    )
    private String phoneNumber;

    @Column(
            name = "birthDate",
            nullable = false,
            columnDefinition = "DATE"
    )
    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    private AppUserRole role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Rental> rentals = new ArrayList<>();

    public AppUser(String firstname,
                   String lastname,
                   String email,
                   String password,
                   String phoneNumber,
                   LocalDate birthDate,
                   AppUserRole role) {
        this.userId = UUID.randomUUID();
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birthDate = birthDate;
        this.role = role;
    }

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
