package com.example.homebookexpress.service;

import com.example.homebookexpress.models.Client;
import com.example.homebookexpress.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> getClients() {
//        return List.of(
//                new Client(
//                        UUID.randomUUID(),
//                        "Alex",
//                        "Carlos",
//                        LocalDate.of(2000, Month.JANUARY, 4),
//                        "alex@cirlo.com",
//                        "0722125715"
//                )
//        );
        return clientRepository.findAll();
    }

    public Optional<Client> getClient(UUID clientID) {
        return clientRepository.findById(clientID);
    }

    public Client addClient(Client client) {
        System.out.println(client);
        return clientRepository.save(client);
    }
}
