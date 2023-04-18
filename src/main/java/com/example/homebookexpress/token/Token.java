package com.example.homebookexpress.token;

import com.example.homebookexpress.appuser.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "tokens")
public class Token {
    @Id
    @GeneratedValue
    @Column(name = "token_id")
    private UUID tokenId;

    @Column(
            name = "token",
            nullable = false,
            columnDefinition = "VARCHAR(255)")
    private String token;
    @Column(
            name = "token_expired",
            nullable = false,
            columnDefinition = "BOOLEAN")
    private boolean tokenExpired;
    @Column(
            name = "token_revoked",
            nullable = false,
            columnDefinition = "BOOLEAN")
    private boolean tokenRevoked;

    @ManyToOne(
            fetch = FetchType.LAZY,
            cascade = {CascadeType.MERGE, CascadeType.PERSIST,CascadeType.REFRESH}
    )
    @JoinColumn(name = "app_user_id", referencedColumnName = "user_id")
    @JsonIgnore
    private AppUser user;
}
