package com.example.homebookexpress.appuser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Controller
public class AppUserController {
    private final AppUserService appUserService;

    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/api/v1/appuser/getallusers")
    @Secured(value = "ADMIN")
    public List<AppUser> getAppUsers() {
        return appUserService.getAppUsers();
    }

    @GetMapping("/api/v1/appuser/getuserbyid")
    public AppUser getAppUserById(@RequestParam("userId") UUID userId) {
        return appUserService.getAppUserById(userId);
    }

    @GetMapping("/api/v1/appuser/getuserbyemail")
    public AppUser getAppUserByEmail(@RequestParam("userEmail") String userEmail) {
        return appUserService.getAppUserByEmail(userEmail);
    }

    @DeleteMapping("/api/v1/appuser/deleteuser")
    public AppUser deleteAppUser(@RequestParam("userId") UUID userId) {
        return appUserService.deleteAppUser(userId);
    }

}
