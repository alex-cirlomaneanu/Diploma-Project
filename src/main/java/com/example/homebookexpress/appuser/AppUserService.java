package com.example.homebookexpress.appuser;

import com.example.homebookexpress.exception.UserNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final AppUserRepository appUserRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.getAppUserByEmail(email)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found"));
    }

    public AppUser getAppUserById(UUID userId) {
        return appUserRepository.getAppUserByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException(userId.toString()));
    }

    public AppUser getAppUserByEmail(String userEmail) {
        return appUserRepository.getAppUserByEmail(userEmail)
                .orElseThrow(() -> new UserNotFoundException(userEmail));
    }

    public List<AppUser> getAppUsers() {
        return appUserRepository.findAll();
    }

    public AppUser deleteAppUser(UUID userId) {
        AppUser appUser = appUserRepository.getAppUserByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException(userId.toString()));

        appUserRepository.delete(appUser);

        return appUser;
    }

    public AppUser updateAppUser(AppUser appUser) {
        AppUser appUserToUpdate = appUserRepository.getAppUserByUserId(appUser.getUserId())
                .orElseThrow(() -> new UserNotFoundException(appUser.getUserId().toString()));

        appUserToUpdate.setFirstname(appUser.getFirstname());
        appUserToUpdate.setLastname(appUser.getLastname());
        appUserToUpdate.setEmail(appUser.getEmail());
        appUserToUpdate.setPassword(appUser.getPassword());

        appUserRepository.save(appUserToUpdate);

        return appUserToUpdate;
    }


}
