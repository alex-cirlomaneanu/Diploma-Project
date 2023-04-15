package com.example.homebookexpress.appuser;

import com.example.homebookexpress.book.Book;
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
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        return appUserRepository.getAppUserByEmail(userEmail)
                .orElseThrow(() ->
                        new UserNotFoundException(userEmail));
    }

    public AppUser getAppUserById(UUID userId) {
        return appUserRepository.getAppUserByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));
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
                .orElseThrow(() -> new UserNotFoundException(userId));

        appUserRepository.delete(appUser);

        return appUser;
    }

    public List<String> getBookHistory(UUID userId) {
        return appUserRepository.getBookHistoryByUserId(userId);
    }
}
