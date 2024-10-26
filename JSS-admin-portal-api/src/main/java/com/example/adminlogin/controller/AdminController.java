package com.example.adminlogin.controller;

import com.example.adminlogin.model.Admin;
import com.example.adminlogin.repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AdminController {
    @Autowired
    private AdminRepo adminRepo;

    private static final String FIXED_EMAIL = "admin@example.com"; // Fixed email
    private static final String FIXED_PASSWORD = "admin123"; // Fixed password (should be hashed in production)

    @PostMapping("/login")
    public ResponseEntity<ResponseMessage> login(@RequestBody Admin loginRequest) {
        if (loginRequest.getEmail().equals(FIXED_EMAIL) && loginRequest.getPassword().equals(FIXED_PASSWORD)) {
            return ResponseEntity.ok(new ResponseMessage("Login successful")); // Return JSON object
        } else {
            return ResponseEntity.status(401).body(new ResponseMessage("Invalid credentials")); // Return JSON object for failure
        }
    }

    // Change password method
    @PutMapping("/change-password")
    public ResponseEntity<ResponseMessage> changePassword(@RequestBody Admin changeRequest) {
        if (changeRequest.getEmail().equals(FIXED_EMAIL)) {
            if (!changeRequest.getPassword().isEmpty()) {
                // In a real-world application, you should save the new password here (hashing it before storing)
                return ResponseEntity.ok(new ResponseMessage("Password updated successfully")); // Return JSON object for success
            } else {
                return ResponseEntity.badRequest().body(new ResponseMessage("Password cannot be empty")); // Return JSON object for bad request
            }
        } else {
            return ResponseEntity.status(401).body(new ResponseMessage("Unauthorized")); // Return JSON object for unauthorized
        }
    }



    // ResponseMessage class to wrap messages
    class ResponseMessage {
        private String message;

        public ResponseMessage(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}


