package com.example.homebookexpress.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TokenRepository extends JpaRepository<Token, UUID> {

    @Query(
            value = "SELECT t.token_id, t.token, " +
                    "t.token_expired, t.token_revoked, t.app_user_id " +
                    "FROM homebook.tokens t, homebook.app_users u " +
                    "WHERE u.user_id = t.app_user_id " +
                    "AND u.user_id = ?1 " +
                    "AND (t.token_expired = false or t.token_revoked = false)",
            nativeQuery = true
    )
    List<Token> findAllValidTokensByUserId(UUID userId);


    Optional<Token> findByToken(String token);

    @Query(
            "SELECT u.email from tokens t, app_users u " +
            "where t.user.userId = u.userId and " +
            "t.token = ?1"
    )
    String findEmailByToken(String token);
}
