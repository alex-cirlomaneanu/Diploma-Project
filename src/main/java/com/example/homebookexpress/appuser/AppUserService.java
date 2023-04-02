package com.example.homebookexpress.appuser;

import com.example.homebookexpress.exception.UserNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final AppUserRepository appUserRepository;

    public List<AppUser> getUsers() {
        return appUserRepository.findAll();
    }

    public Optional<AppUser> getUser(UUID clientID) {
        return appUserRepository.findById(clientID);
    }

    public AppUser addUser(AppUser appUser) {
        System.out.println(appUser);
        return appUserRepository.save(appUser);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.getAppUserByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));
    }
}
