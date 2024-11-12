package com.example.adminlogin.controller;

import com.example.adminlogin.model.Student;
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
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController

public class StudentController {

    @Autowired
    private StudentRepo studentRepo;



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
        System.out.println("Received user data: " + user);
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
            saveFile(file, "C:/Users/nithya prashanth/Desktop/images/uploads/marksCard/");
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
            saveFile(file, "C:/Users/nithya prashanth/Desktop/images/uploads/photo/");
            return ResponseEntity.ok("Photo uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();  // Log the error
            return ResponseEntity.status(500).body("Failed to upload Photo: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();  // Log the error
            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
        }
    }



//    @PostMapping("/upload-marksCard")
//    public ResponseEntity<String> uploadMarksCard(@RequestParam("marksCard") MultipartFile file) {
//        try {
//            // Save the file to the server or process it
//            System.out.println("Marks Card file received: " + file.getOriginalFilename());
//            // Save the file to disk or cloud storage as required
//            saveFile(file, "C:/Users/nithya prashanth/Desktop/images/uploads/marksCard/");
//            return ResponseEntity.ok("Marks Card uploaded successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Failed to upload Marks Card");
//        }
//    }
//
//    @PostMapping("/upload-photo")
//    public ResponseEntity<String> uploadPhoto(@RequestParam("photo") MultipartFile file) {
//        try {
//            // Save the file to the server or process it
//            System.out.println("Photo file received: " + file.getOriginalFilename());
//            // Save the file to disk or cloud storage as required
//            saveFile(file, "C:/Users/nithya prashanth/Desktop/images/uploads/photo/");
//            return ResponseEntity.ok("Photo uploaded successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Failed to upload Photo");
//        }
//    }


//    @PostMapping("/upload-files")
//    public ResponseEntity<String> uploadFiles(
//            @RequestParam("marksCard") MultipartFile marksCard,
//            @RequestParam("photo") MultipartFile photo) {
//        try {
//            // Specify the directory where the files will be saved
//            String targetDir = "C:/Users/nithya prashanth/Desktop/images/uploads"; // Adjust this path as needed
//
//            // Save the files
//            saveFile(marksCard, targetDir);
//            saveFile(photo, targetDir);
//
//            return ResponseEntity.ok("Files uploaded successfully.");
//        } catch (IOException e) {
//            return ResponseEntity.status(500).body("File upload failed: " + e.getMessage());
//        }
//    }
//
//    @PostMapping("/upload-marksCard")
//    public ResponseEntity<String> uploadMarksCard(@RequestParam("marksCard") MultipartFile file) {
//        try {
//            // Save the file to the server or process it
//            System.out.println("Marks Card file received: " + file.getOriginalFilename());
//            // Save the file to disk or cloud storage as required
//            return ResponseEntity.ok("Marks Card uploaded successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Failed to upload Marks Card");
//        }
//    }
//
//    @PostMapping("/upload-photo")
//    public ResponseEntity<String> uploadPhoto(@RequestParam("photo") MultipartFile file) {
//        try {
//            // Save the file to the server or process it
//            System.out.println("Photo file received: " + file.getOriginalFilename());
//            // Save the file to disk or cloud storage as required
//            return ResponseEntity.ok("Photo uploaded successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Failed to upload Photo");
//        }
//    }

//    @GetMapping("/get-students-by-semester/{semester}")
//    public List<Student> getStudentsBySemester(@PathVariable String semester) {
//        return studentRepo.findBySemester(semester);  // Assuming you have this query in your StudentRepo
//    }

//    @GetMapping("/get-students-by-semester/{semester}")
//    public ResponseEntity<List<Student>> getStudentsBySemester(@PathVariable String semester) {
//        List<Student> students = studentRepo.findBySemester(semester);
//        if (students.isEmpty()) {
//            return ResponseEntity.status(404).body(null);  // No students found for the selected semester
//        }
//        return ResponseEntity.ok(students);
//    }
}