package com.example.homebookexpress;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@SpringBootApplication
@RestController
public class HomeBookExpressApplication {

    public static void main(String[] args) {
        SpringApplication.run(HomeBookExpressApplication.class, args);
    }

    @GetMapping("/hello")
    public List<String> hello() {
        return List.of("Hi", "Everyone", "I'm", "Yi Long Ma");

    }

}
