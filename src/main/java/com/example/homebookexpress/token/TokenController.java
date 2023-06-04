package com.example.homebookexpress.token;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Controller
@AllArgsConstructor
@RequestMapping(path = "/api/v1")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TokenController {
    private final TokenService tokenService;

    @GetMapping("/getemailbytoken")
    public ResponseEntity<String> getEmailByToken(String token) {
        return ResponseEntity.ok(tokenService.getEmailByToken(token));
    }
}
