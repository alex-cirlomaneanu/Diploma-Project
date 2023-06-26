package com.example.homebookexpress.auth;

import com.example.homebookexpress.appuser.AppUser;
import com.example.homebookexpress.appuser.AppUserRepository;
import com.example.homebookexpress.appuser.AppUserRole;
import com.example.homebookexpress.config.JwtService;
import com.example.homebookexpress.exception.UserNotFoundException;
import com.example.homebookexpress.token.Token;
import com.example.homebookexpress.token.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AppUserRepository appUserRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {
        AppUser newUser = AppUser.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .birthDate(request.getBirthDate())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(AppUserRole.USER)
                .address(request.getAddress())
                .bankAccount(request.getBankAccount())
                .build();
        appUserRepository.save(newUser);
        String jwtToken = jwtService.generateToken(newUser);
        saveUserToken(newUser, jwtToken);

        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        AppUser user = appUserRepository.getAppUserByEmail(request.getEmail())
                .orElseThrow(() -> new UserNotFoundException(request.getEmail()));
        String jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private void saveUserToken(AppUser user, String jwtToken) {
        Token token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenExpired(false)
                .tokenRevoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(AppUser user) {
        List<Token> allUserTokens = tokenRepository.findAllValidTokensByUserId(user.getUserId());
        if (!allUserTokens.isEmpty()) {
            allUserTokens.forEach(token -> {
                token.setTokenRevoked(true);
                token.setTokenExpired(true);
                tokenRepository.save(token);
            });
        }
    }
}
