package com.example.homebookexpress.appuser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class AppUserController {
    private final AppUserService appUserService;

    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

//    @PostMapping("/register")
//    @ResponseStatus(HttpStatus.CREATED)
//    public AppUser createClient(@ModelAttribute("client") AppUser appUser) {
//        return appUserService.addUser(appUser);
//    }

//    @RequestMapping(value = "register", method = {RequestMethod.GET, RequestMethod.POST} )
//    public String showRegistartionForm(Model model) {
//        // TODO: 13.03.2023 implement register method using service
//        model.addAttribute("client", new AppUser());
//        return "register";
//    }


//    @GetMapping
//    public List<AppUser> getClients() {
//        return appUserService.getClients();
//    }

}
