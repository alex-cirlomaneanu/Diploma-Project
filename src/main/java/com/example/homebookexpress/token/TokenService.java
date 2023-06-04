package com.example.homebookexpress.token;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;

    public String getEmailByToken(String token) {
        return tokenRepository.findEmailByToken(token);
    }
}
