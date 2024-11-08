package com.example.adminlogin.controller;

import com.example.adminlogin.model.Student;
import com.example.adminlogin.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController

public class StudentController {

    @Autowired
    private StudentRepo studentRepo;

//    @PostMapping("/register-user/login")
//    public Student login(@RequestBody Student student) {
//        System.out.println(student);
//        Student dbUser = studentRepo.findByEmailAndPassword(student.getEmail(), student.getPassword());
//        System.out.println("Received User from DB: " + dbUser);
//        return dbUser;
//    }

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

    @PostMapping("/register-user")
    public ResponseEntity<Student> adduser(@RequestBody Student user) {
        System.out.println(user);
        Student savedUser = studentRepo.save(user);
        System.out.println("Successfully Added");
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
}