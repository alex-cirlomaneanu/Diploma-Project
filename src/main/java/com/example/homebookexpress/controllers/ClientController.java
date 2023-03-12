package com.example.homebookexpress.controllers;

import com.example.homebookexpress.models.Client;
import com.example.homebookexpress.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/v1/client")
public class ClientController {
    private final ClientService clientService;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping
    public void createClient(Client client) {
        clientService.addClient(client);
    }

    @GetMapping
    public List<Client> getClients() {
        return clientService.getClients();
    }

}
