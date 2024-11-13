package com.example.adminlogin.controller;

import com.example.adminlogin.model.Role;
import com.example.adminlogin.model.Student;
import com.example.adminlogin.repository.RoleRepo;
import com.example.adminlogin.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.nio.file.StandardCopyOption;
import java.util.*;

@CrossOrigin
@RestController

public class StudentController {

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private RoleRepo roleRepo;


    @PostMapping("/register-user/login")
    public ResponseEntity<Student> login(@RequestBody Student student) {
        Student dbUser = studentRepo.findByEmailAndPassword(student.getEmail(), student.getPassword());
        if (dbUser == null) {
            return ResponseEntity.status(401).body(null); // Or return a custom error response
        }
        return ResponseEntity.ok(dbUser);
    }


    @GetMapping("/get-all-users")
    public List<Student> getAllUsers() {
        return studentRepo.findAll();
    }

    @GetMapping("/get-user/{userId}")
    public Student getuserById(@PathVariable Long userId) {
        Optional<Student> register = studentRepo.findById(userId);
        return register.orElse(null);
    }

//    @PostMapping("/register-user")
//    public ResponseEntity<Student> adduser(@RequestBody Student user) {
//        System.out.println("Received user data: " + user);
//        Student savedUser = studentRepo.save(user);
//        System.out.println("Successfully Added");
//        return ResponseEntity.ok(savedUser);
//    }

    @PostMapping("/register-user")
    public ResponseEntity<Student> addUser(@RequestBody Student user) {
        // Link role_id 2 to the student
        Role role = roleRepo.findById(2L).orElseThrow(() -> new RuntimeException("Role not found"));
        user.setRole(role);  // Updated to use 'role' field
        Student savedUser = studentRepo.save(user);
        return ResponseEntity.ok(savedUser);
    }


    @PutMapping("/update-user")
    public ResponseEntity<String> updateuser(@RequestBody Student user) {
        if (studentRepo.existsById(user.getStudId())) {
            studentRepo.save(user);
            return ResponseEntity.ok("User updated successfully");
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @DeleteMapping("/delete-user/{userId}")
    public ResponseEntity<String> deleteuser(@PathVariable Long userId) {
        if (studentRepo.existsById(userId)) {
            studentRepo.deleteById(userId);
            return ResponseEntity.ok("User deleted successfully");
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    private void saveFile(MultipartFile file, String targetDir) throws IOException {
        Path targetLocation = Paths.get(targetDir + file.getOriginalFilename());
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        System.out.println("File saved to: " + targetLocation.toString());
    }

    @PostMapping("/upload-marksCard")
    public ResponseEntity<String> uploadMarksCard(@RequestParam("marksCard") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(400).body("No file selected");
            }

            System.out.println("Marks Card file received: " + file.getOriginalFilename());
            saveFile(file, "C:/Users/nithya prashanth/Desktop/images/student/marksCard/");
            return ResponseEntity.ok("Marks Card uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();  // Log the error
            return ResponseEntity.status(500).body("Failed to upload Marks Card: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  // Log the error
            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
        }
    }

    @PostMapping("/upload-photo")
    public ResponseEntity<String> uploadPhoto(@RequestParam("photo") MultipartFile file) {

        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(400).body("No file selected");
            }

            System.out.println("Photo file received: " + file.getOriginalFilename());
            saveFile(file, "C:/Users/nithya prashanth/Desktop/images/student/photo/");
            return ResponseEntity.ok("Photo uploaded successfully");

        } catch (IOException e) {
            e.printStackTrace();  // Log the error
            return ResponseEntity.status(500).body("Failed to upload Photo: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  // Log the error
            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
        }
    }


}