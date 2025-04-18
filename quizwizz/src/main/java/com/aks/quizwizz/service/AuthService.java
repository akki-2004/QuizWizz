package com.aks.quizwizz.service;

import com.aks.quizwizz.DTO.UserDTO;
import com.aks.quizwizz.model.User;
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

    public String register(com.aks.quizwizz.DTO.UserDTO userDTO) {
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            return "User already exists!";
        }

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRole("STUDENT");

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
    
        if (!passwordEncoder.matches(password, user.getPassword())) {
            System.out.println("❌ Invalid password for: " + username);
            return null;
        }
    
        // ✅ Always returns a String
        return jwtUtil.generateToken(username, user.getRole());

    }
    
}