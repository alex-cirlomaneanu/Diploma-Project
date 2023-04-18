package com.example.homebookexpress.auth;

import com.example.homebookexpress.config.LogoutService;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/auth")
@AllArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final LogoutService logoutService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authenticationService.register((request)));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authenticationService.authenticate((request)));
    }

    @PostMapping("/logout")
    @ApiOperation(value = "Logout user")
    @SecurityRequirement(name = "Bearer Authentication")
    public ResponseEntity<String> logout(
            HttpServletRequest request, HttpServletResponse response, Authentication authentication
    ) {
        if (authentication == null) {
            return ResponseEntity.ok("User not logged in");
        }
        logoutService.logout(request, response, authentication);
        return ResponseEntity.ok("Logout successful");
    }
}
