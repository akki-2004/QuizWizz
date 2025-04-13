package com.aks.quizwizz.service;

import org.springframework.data.jpa.repository.JpaRepository;
import com.aks.quizwizz.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
