package com.aks.quizwizz.service;

import com.aks.quizwizz.model.User;
import com.aks.quizwizz.service.UserRepository;
import com.aks.quizwizz.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "User already exists!";
        }

        // Hash password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return "User registered successfully!";
    }

    public String login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
    
        if (userOpt.isEmpty()) {
            System.out.println("❌ User not found: " + username);
            return null;
        }
    
        User user = userOpt.get();
        System.out.println("🔹 Stored Hashed Password: " + user.getPassword());
        System.out.println("🔹 Entered Password: " + password);
    
        if (!passwordEncoder.matches(password, user.getPassword())) {
            System.out.println("❌ Password does not match");
            return null;
        }
    
        return jwtUtil.generateToken(username);
    }
    
}
