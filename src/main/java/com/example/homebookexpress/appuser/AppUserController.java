package com.example.homebookexpress.appuser;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
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
    public List<String > getBookHistory(@RequestParam("userId") UUID userId) {
        return appUserService.getBookHistory(userId);
    }
}
