package com.example.homebookexpress.appuser;

import com.example.homebookexpress.book.Book;
import com.example.homebookexpress.rental.Rental;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Controller
@SecurityRequirement(name = "Bearer Authentication")
@RequestMapping(path = "/api/v1/appuser")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AppUserController {
    private final AppUserService appUserService;

    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/getallusers")
    @Secured(value = "ADMIN")
    public List<AppUser> getAppUsers() {
        return appUserService.getAppUsers();
    }

    @GetMapping("/getusernamebyuseremail")
    public String getUserNameByUserEmail(@RequestParam("userEmail") String userEmail) {
        return appUserService.getUserNameByUserEmail(userEmail);
    }

    @GetMapping("/userdetalis/{userEmail}")
    public AppUser getAppUserByEmail(@PathVariable @RequestParam("userEmail") String userEmail) {
        return appUserService.getAppUserByEmail(userEmail);
    }

    @DeleteMapping("/deleteuser")
    public AppUser deleteAppUser(@RequestParam("userId") UUID userId) {
        return appUserService.deleteAppUser(userId);
    }

    @GetMapping("/getbookhistory")
    public List<Book> getBookHistory(@RequestParam("userId") UUID userId) {
        return appUserService.getBookHistory(userId);
    }

    @PutMapping("/edituser")
    public AppUser editAppUser(@RequestBody EditUserDTO editUserDTO) {
        return appUserService.editAppUser(editUserDTO);
    }

    @GetMapping("/getuserentals")
    public List<RentalDTO> getUserRentals(@RequestParam("userId") UUID userId) {
        return appUserService.getUserRentals(userId);
    }

    @PostMapping("/changepassword")
    public void changePassword(@RequestParam("userId") UUID userId, @RequestParam("newPassword") String newPassword) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        appUserService.changePassword(userId, passwordEncoder.encode(newPassword));
    }
}
