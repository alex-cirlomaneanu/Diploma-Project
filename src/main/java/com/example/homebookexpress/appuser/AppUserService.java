package com.example.homebookexpress.appuser;

import com.example.homebookexpress.book.Book;
import com.example.homebookexpress.exception.UserNotFoundException;
import com.example.homebookexpress.rental.Rental;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        // Delete associated rental records
        List<Rental> rentals = appUser.getRentals();
        for (Rental rental : rentals) {
            rental.setUser(null); // Remove the association with the user
        }
        appUserRepository.save(appUser); // Save the changes to update the rental associations

        appUserRepository.delete(appUser); // Delete the user

        appUserRepository.delete(appUser);

        return appUser;
    }

    public List<Book> getBookHistory(UUID userId) {
        return appUserRepository.getBookHistoryByUserId(userId);
    }

    public String getUserNameByUserEmail(String userEmail) {
        return appUserRepository.getUserNameByEmail(userEmail).getFirstname();
    }

    public AppUser editAppUser(EditUserDTO editUserDTO) {
        UUID userId = editUserDTO.getUserId();

        AppUser appUser = appUserRepository.getAppUserByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException(userId));

        // Update the user information
        appUser.setFirstname(editUserDTO.getFirstname());
        appUser.setLastname(editUserDTO.getLastname());
        appUser.setEmail(editUserDTO.getEmail());
        appUser.setPhoneNumber(editUserDTO.getPhoneNumber());
        appUser.setBirthDate(editUserDTO.getBirthDate());

        // Save the updated user
        return appUserRepository.save(appUser);
    }

    public List<RentalDTO> getUserRentals(UUID userId) {
        List<RentalProjection> rentalProjections = appUserRepository.getRentalsByUserId(userId);
        List<RentalDTO> rentalDTOS = new ArrayList<>();

        for (RentalProjection rentalProjection : rentalProjections) {
            RentalDTO rentalDTO = new RentalDTO();
            rentalDTO.setTitle(rentalProjection.getTitle());
            rentalDTO.setRentalDate(rentalProjection.getRentalDate());
            rentalDTO.setReturnDate(rentalProjection.getReturnDate());
            rentalDTO.setStatus(rentalProjection.getStatus());
            rentalDTOS.add(rentalDTO);
        }

        return rentalDTOS;
    }

    public void changePassword(UUID userId, String newPassword) {
        appUserRepository.changePassword(userId, newPassword);
    }

}
