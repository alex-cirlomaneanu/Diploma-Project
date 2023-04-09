package com.example.homebookexpress;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;

@SpringBootApplication
@RestController
@EnableWebMvc
public class HomeBookExpressApplication {

    public static void main(String[] args) {
        SpringApplication.run(HomeBookExpressApplication.class, args);
    }
}
