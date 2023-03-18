package com.example.homebookexpress.appuser;


import com.example.homebookexpress.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, UUID> {

    Optional<AppUser> findAppUserById(UUID id);
    Optional<AppUser> findAppUserByEmail(String email);
}
