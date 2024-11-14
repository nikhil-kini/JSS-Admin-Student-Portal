package com.example.adminlogin.controller;


import com.example.adminlogin.model.User;

import com.example.adminlogin.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepo userRepository;


    private static final String SSLM_MARKS_CARD_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/sslcMarksCard/";
    private static final String BE_MARKS_CARD_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/beMarksCard/";
    private static final String DEGREE_CERTIFICATE_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/degreeCertificate/";
    private static final String PHOTO_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/photo/";

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Registration Endpoint
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(400).body("Email is already in use.");
        }
        // Encode password before saving
        String encodedPassword = Base64.getEncoder().encodeToString(user.getPassword().getBytes(StandardCharsets.UTF_8));
        user.setPassword(encodedPassword);
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully.");
    }

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            String storedPassword = existingUser.get().getPassword();
            String decodedPassword = new String(Base64.getDecoder().decode(storedPassword), StandardCharsets.UTF_8);

            if (decodedPassword.equals(user.getPassword())) {
                User foundUser = existingUser.get();
                return ResponseEntity.ok(foundUser);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }


    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> passwordData) {
        String email = passwordData.get("email");
        String oldPassword = passwordData.get("oldPassword");
        String newPassword = passwordData.get("newPassword");
        String confirmPassword = passwordData.get("confirmPassword");

        // Validate that new password and confirm password match
        if (!newPassword.equals(confirmPassword)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("New password and confirm password do not match.");
        }

        Optional<User> dbUser = userRepository.findByEmail(email);
        if (dbUser.isPresent()) {
            User existingUser = dbUser.get();

            // Decode the stored password and compare with the provided old password
            String decodedStoredPassword = new String(Base64.getDecoder().decode(existingUser.getPassword()), StandardCharsets.UTF_8);
            if (!decodedStoredPassword.equals(oldPassword)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Old password is incorrect.");
            }

            // Encode the new password and save it
            String encodedNewPassword = Base64.getEncoder().encodeToString(newPassword.getBytes(StandardCharsets.UTF_8));
            existingUser.setPassword(encodedNewPassword);
            userRepository.save(existingUser);

            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found.");
        }
    }

    @GetMapping("/{id}")
        public ResponseEntity<User> getUserById (@PathVariable Long id){
            Optional<User> user = userRepository.findById(id);
            return user.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.status(404).build());
        }


        @PutMapping("/{id}")
        public ResponseEntity<User> updateUser (@PathVariable Long id, @RequestBody User updatedUser){
            Optional<User> existingUserOpt = userRepository.findById(id);

            if (!existingUserOpt.isPresent()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            User existingUser = existingUserOpt.get();

            // Update only the fields that are provided in the request body
            if (updatedUser.getEmail() != null) {
                existingUser.setEmail(updatedUser.getEmail());
            }
            if (updatedUser.getPassword() != null) {
                // Encode the new password if it's provided
                String encodedPassword = Base64.getEncoder().encodeToString(updatedUser.getPassword().getBytes(StandardCharsets.UTF_8));
                existingUser.setPassword(encodedPassword);
            }

            userRepository.save(existingUser);
            return ResponseEntity.ok(existingUser);
        }

        // Delete User
        @DeleteMapping("/{id}")
        public ResponseEntity<String> deleteUser(@PathVariable Long id){
            if (!userRepository.existsById(id)) {
                return ResponseEntity.status(404).body("User not found.");
            }
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully.");
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> registeruser(

            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("phoneno") String phoneno,
            @RequestParam("address") String address,
            @RequestParam("adharno") String adharno,

            @RequestParam("sslcMarksCard") MultipartFile sslcMarksCard,
            @RequestParam("beMarksCard") MultipartFile beMarksCard,
            @RequestParam("degreeCertificate") MultipartFile degreeCertificate,
            @RequestParam("photo") MultipartFile photo) {

        // Save the files to their respective directories
        try {
            String sslcMarksCardPath = saveFile(sslcMarksCard, SSLM_MARKS_CARD_DIR);
            String beMarksCardPath = saveFile(beMarksCard, BE_MARKS_CARD_DIR);
            String degreeCertificatePath = saveFile(degreeCertificate, DEGREE_CERTIFICATE_DIR);
            String photoPath = saveFile(photo, PHOTO_DIR);



            // Create a new Staff entity and set its fields
            User staff = new User();
            staff.setUsername(username);
            staff.setEmail(email);
            staff.setPassword(password);
            staff.setPhoneno(phoneno);
            staff.setAddress(address);
            staff.setAdharno(adharno);
            staff.setSslcMarksCardPath(sslcMarksCardPath);  // Save the original filename
            staff.setBeMarksCardPath(beMarksCardPath);
            staff.setDegreeCertificatePath(degreeCertificatePath);
            staff.setPhotoPath(photoPath);



            // Save the staff entity to the database
            userRepository.save(user);

            return ResponseEntity.ok().body("Staff registration successful!");

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading files or saving staff: " + e.getMessage());
        }
    }

    // Method to save the file to its specific directory and return the path
    private String saveFile(MultipartFile file, String targetDir) throws Exception {
        if (file != null && !file.isEmpty()) {
            String originalFilename = file.getOriginalFilename();
            Path path = Paths.get(targetDir + "/" + originalFilename);
            Files.createDirectories(path.getParent());  // Create the directory if it doesn't exist
            Files.write(path, file.getBytes());  // Save the file
            System.out.println("File saved at: " + path.toString());  // Log the file path
            return originalFilename;  // Return the original filename to save in the database
        } else {
            throw new Exception("File is empty or missing.");
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllStaff() {
        try {
            // Fetch all staff records from the database
            List<User> staffList = user.findAll();
            return ResponseEntity.ok().body(staffList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving staff data: " + e.getMessage());
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateuser(@PathVariable Long id, @RequestBody User updateduser) {
        return userrepository.findById(id).map(staff -> {
            staff.setusername(updateduser.getUsername());
            staff.setEmail(updateduser.getEmail());
            staff.setPhoneno(updateduser.getPhoneno());
            staff.setAddress(updateduser.getAddress());
            staff.setAdharno(updateduser.getAdharno());
            // Update any other necessary fields here
            userrepository.save(user);
            return ResponseEntity.ok().body("Staff updated successfully!");
        }).orElse(ResponseEntity.status(404).body("Staff not found"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable Long id) {
        if (userrep.existsById(id)) {
            staffRepo.deleteById(id);
            return ResponseEntity.ok().body("Staff deleted successfully!");
        } else {
            return ResponseEntity.status(404).body("Staff not found");
        }
    }
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