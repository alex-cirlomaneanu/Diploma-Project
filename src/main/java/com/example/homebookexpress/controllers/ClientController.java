package com.example.homebookexpress.controllers;

import com.example.homebookexpress.models.Client;
import com.example.homebookexpress.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ClientController {
    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping("/register")
    public Client createClient(@RequestBody Client client) {
        return clientService.addClient(client);
    }

    @RequestMapping(value = "register", method = {RequestMethod.GET, RequestMethod.POST} )
    public String showRegistartionForm(Model model) {
        // TODO: 13.03.2023 implement register method using service
        model.addAttribute("client", new Client());
        return "register";
    }


    @GetMapping
    public List<Client> getClients() {
        return clientService.getClients();
    }

}
