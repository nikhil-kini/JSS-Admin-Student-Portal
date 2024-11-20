package com.example.adminlogin.controller;

import com.example.adminlogin.model.User;
import com.example.adminlogin.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.List;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    // Hardcoded directory paths for file uploads
    private static final String SSLC_MARKS_CARD_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/sslcMarksCard/";
    private static final String BE_MARKS_CARD_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/beMarksCard/";
    private static final String DEGREE_CERTIFICATE_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/degreeCertificate/";
    private static final String PHOTO_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/photo/";
    private static final String STAFF_PROFILE_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/staffprofile/";
    private static final String ADHAR_CARD_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/adharcard/";
    private static final String CASTE_CERTIFICATE_DIR = "C:/Users/nithya prashanth/Desktop/images/student/castecertificate/";
    private static final String INCOME_CERTIFICATE_DIR = "C:/Users/nithya prashanth/Desktop/images/student/incomecertificate/";
    private static final String MARKS_CARD_DIR = "C:/Users/nithya prashanth/Desktop/images/student/marksCard/";
    private static final String MIGRATION_CERTIFICATE_DIR = "C:/Users/nithya prashanth/Desktop/images/student/migrationcertificate/";
    private static final String STUDENT_PHOTO_DIR = "C:/Users/nithya prashanth/Desktop/images/student/photo/";
    private static final String PHYSICAL_FITNESS_DIR = "C:/Users/nithya prashanth/Desktop/images/student/physicalfitness/";
    private static final String STUDY_CERTIFICATE_DIR = "C:/Users/nithya prashanth/Desktop/images/student/studycertificate/";
    private static final String TRANSFER_CERTIFICATE_DIR = "C:/Users/nithya prashanth/Desktop/images/student/tc/";


    @Autowired
    private UserRepo userRepository;



    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

//    Staff
    @GetMapping("/getAll")
    public ResponseEntity<?> getAllUser() {
        try {
            // Fetch all staff records from the database
            List<User> staffList = userRepository.findAll();
            return ResponseEntity.ok().body(staffList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving staff data: " + e.getMessage());
        }
    }


//    @PostMapping("/register1")
//    public ResponseEntity<String> register(@RequestBody User user) {
//        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
//            return ResponseEntity.status(400).body("Email is already in use.");
//        }
//        // Encode password before saving
//        String encodedPassword = Base64.getEncoder().encodeToString(user.getPassword().getBytes(StandardCharsets.UTF_8));
//        user.setPassword(encodedPassword);
//        userRepository.save(user);
//        return ResponseEntity.ok("User registered successfully.");
//    }


    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(
            @RequestParam("userName") String userName,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("phoneno") String phoneno,
            @RequestParam("address") String address,
            @RequestParam("adharno") String adharno,
            @RequestParam("role") String role,
            @RequestParam("dept") String dept,
            @RequestParam("semester") String semester,
            @RequestParam("momphoneno") String momphoneno,
            @RequestParam("dadphoneno") String dadphoneno,
            @RequestParam("regno") String regno,
            @RequestParam("panCardNumber") String panCardNumber,
            @RequestParam(value = "sslcMarksCard", required = false) MultipartFile sslcMarksCard,
            @RequestParam(value = "beMarksCard", required = false) MultipartFile beMarksCard,
            @RequestParam(value = "degreeCertificate", required = false) MultipartFile degreeCertificate,
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "staffProfile", required = false) MultipartFile staffProfile,
            @RequestParam(value = "adharCard", required = false) MultipartFile adharCard,
            @RequestParam(value = "studyCertificate", required = false) MultipartFile studyCertificate,
            @RequestParam(value = "transferCertificate", required = false) MultipartFile transferCertificate,
            @RequestParam(value = "physicalFitness", required = false) MultipartFile physicalFitness,
            @RequestParam(value = "migrationCertificate", required = false) MultipartFile migrationCertificate,
            @RequestParam(value = "incomeCertificate", required = false) MultipartFile incomeCertificate,
            @RequestParam(value = "casteCertificate", required = false) MultipartFile casteCertificate,
            @RequestParam(value = "studsslcmarksCard", required = false) MultipartFile studsslcmarksCard,
            @RequestParam(value = "studphoto", required = false) MultipartFile studphoto
    ) {
        try {
            String sslcMarksCardPath = saveFile(sslcMarksCard, SSLC_MARKS_CARD_DIR);
            String beMarksCardPath = saveFile(beMarksCard, BE_MARKS_CARD_DIR);
            String degreeCertificatePath = saveFile(degreeCertificate, DEGREE_CERTIFICATE_DIR);
            String photoPath = saveFile(photo, PHOTO_DIR);
            String staffProfilePath = saveFile(staffProfile, STAFF_PROFILE_DIR );
            String adharCardPath = saveFile(adharCard, ADHAR_CARD_DIR );
            String studyCertificatePath = saveFile(studyCertificate, STUDY_CERTIFICATE_DIR );
            String transferCertificatePath = saveFile(transferCertificate, TRANSFER_CERTIFICATE_DIR  );
            String physicalFitnessPath = saveFile(physicalFitness, PHYSICAL_FITNESS_DIR );
            String migrationCertificatePath = saveFile(migrationCertificate, MIGRATION_CERTIFICATE_DIR );
            String incomeCertificatePath = saveFile(incomeCertificate, INCOME_CERTIFICATE_DIR);
            String casteCertificatePath = saveFile(casteCertificate, CASTE_CERTIFICATE_DIR );
            String studsslcmarksCardPath = saveFile(studsslcmarksCard, MARKS_CARD_DIR);
            String studphotoPath = saveFile(studphoto, STUDENT_PHOTO_DIR  );


            // Create a new Staff entity and set its fields
            User user = new User();
            user.setUserName(userName);
            user.setEmail(email);
            user.setPassword(password);
            user.setPhoneno(phoneno);
            user.setAddress(address);
            user.setAdharno(adharno);
            user.setDept(dept);
            user.setSemester(semester);
            user.setMomphoneno(momphoneno);
            user.setDadphoneno(dadphoneno);
            user.setRegno(regno);
            user.setRole(role);
            user.setPanCardNumber(panCardNumber);
            user.setSslcMarksCardPath(sslcMarksCardPath);  // Save the original filename
            user.setBeMarksCardPath(beMarksCardPath);
            user.setDegreeCertificatePath(degreeCertificatePath);
            user.setPhotoPath(photoPath);
            user.setStaffProfilePath(staffProfilePath);
            user.setAdharCardPath(adharCardPath);
            user.setCasteCertificatePath(casteCertificatePath);
            user.setIncomeCertificatePath(incomeCertificatePath);
            user.setMigrationCertificatePath(migrationCertificatePath);
            user.setPhysicalFitnessPath(physicalFitnessPath);
            user.setStudyCertificatePath(studyCertificatePath);
            user.setStudphotoPath(studphotoPath);
            user.setStudsslcmarksCardPath(studsslcmarksCardPath);
            user.setTransferCertificatePath(transferCertificatePath);

            // Save the staff entity to the database
            userRepository.save(user);

            return ResponseEntity.ok().body("Staff registration successful!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error uploading files or saving staff: " + e.getMessage());
        }
    }




//    @PostMapping("/login")
//    public ResponseEntity<User> login(@RequestBody User user) {
//        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
//        User dbUser = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
//
//        if (existingUser.isPresent()) {
//            String storedPassword = existingUser.get().getPassword();
//            String decodedPassword = new String(Base64.getDecoder().decode(storedPassword), StandardCharsets.UTF_8);
//
//            if (decodedPassword.equals(user.getPassword())) {
//                User foundUser = existingUser.get();
//                return ResponseEntity.ok(foundUser);
//            }
//        }
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
//    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        User dbUser = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());

        if (existingUser.isPresent()) {
            String storedPassword = existingUser.get().getPassword();
            String decodedPassword = new String(Base64.getDecoder().decode(storedPassword), StandardCharsets.UTF_8);

            if (decodedPassword.equals(user.getPassword())) {
                User foundUser = existingUser.get();

                // Optionally, log the userId for debugging purposes
                System.out.println("Logged in User ID: " + foundUser.getId());  // Logs the userId

                // Return the entire User object, including userId (id field)
                return ResponseEntity.ok(foundUser);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }



//@PostMapping("/register-user/login")
//    public ResponseEntity<User> login(@RequestBody User user) {
//        User dbUser = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
//        if (dbUser == null) {
//            return ResponseEntity.status(401).body(null); // Or return a custom error response
//        }
//        return ResponseEntity.ok(dbUser);
//    }


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

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updateUser) {
        return userRepository.findById(id).map(user -> {
            user.setUserName(updateUser.getUserName());
            user.setEmail(updateUser.getEmail());
            user.setPhoneno(updateUser.getPhoneno());
            user.setAddress(updateUser.getAddress());
            user.setAdharno(updateUser.getAdharno());
            user.setDept(updateUser.getDept());
            user.setSemester(updateUser.getSemester());
            user.setRegno(updateUser.getRegno());
            user.setMomphoneno(updateUser.getMomphoneno());
            user.setDadphoneno(updateUser.getDadphoneno());
            user.setPanCardNumber(updateUser.getPanCardNumber());
            user.setBeMarksCardPath(updateUser.getBeMarksCardPath());
            user.setDegreeCertificatePath(updateUser.getDegreeCertificatePath());
            user.setSslcMarksCardPath(updateUser.getSslcMarksCardPath());
            user.setPhotoPath(updateUser.getPhotoPath());
            user.setStaffProfilePath(updateUser.getStaffProfilePath());
            user.setTransferCertificatePath(updateUser.getTransferCertificatePath());
            user.setStudsslcmarksCardPath(updateUser.getStudsslcmarksCardPath());
            user.setStudphotoPath(updateUser.getStudphotoPath());
            user.setStudyCertificatePath(updateUser.getStudyCertificatePath());
            user.setPhysicalFitnessPath(updateUser.getPhysicalFitnessPath());
            user.setMigrationCertificatePath(updateUser.getMigrationCertificatePath());
            user.setIncomeCertificatePath(updateUser.getIncomeCertificatePath());
            user.setCasteCertificatePath(updateUser.getCasteCertificatePath());


            userRepository.save(user);
            return ResponseEntity.ok().body("Staff updated successfully!");
        }).orElse(ResponseEntity.status(404).body("Staff not found"));
    }

//    @PutMapping("/update-user")
//    public ResponseEntity<String> updateuser(@RequestBody Student user) {
//        if (studentRepo.existsById(user.getStudId())) {
//            studentRepo.save(user);
//            return ResponseEntity.ok("User updated successfully");
//        } else {
//            return ResponseEntity.status(404).body("User not found");
//        }
//    }


//    @PutMapping("/{id}")
//    public ResponseEntity<User> updateUser (@PathVariable Long id, @RequestBody User updatedUser){
//        Optional<User> existingUserOpt = userRepository.findById(id);
//
//        if (!existingUserOpt.isPresent()) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//
//        User existingUser = existingUserOpt.get();
//
//        // Update only the fields that are provided in the request body
//        if (updatedUser.getEmail() != null) {
//            existingUser.setEmail(updatedUser.getEmail());
//        }
//        if (updatedUser.getPassword() != null) {
//            // Encode the new password if it's provided
//            String encodedPassword = Base64.getEncoder().encodeToString(updatedUser.getPassword().getBytes(StandardCharsets.UTF_8));
//            existingUser.setPassword(encodedPassword);
//        }
//
//        userRepository.save(existingUser);
//        return ResponseEntity.ok(existingUser);
//    }
@DeleteMapping("/{id}")
public ResponseEntity<String> deleteUser(@PathVariable Long id){
    if (!userRepository.existsById(id)) {
        return ResponseEntity.status(404).body("User not found.");
    }
    userRepository.deleteById(id);
    return ResponseEntity.ok("User deleted successfully.");
}

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable Long id) {
        try {
            userRepository.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user: " + e.getMessage());
        }
    }



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

//    @PostMapping("/upload-marksCard")
//    public ResponseEntity<String> uploadMarksCard(@RequestParam("marksCard") MultipartFile file) {
//        try {
//            if (file.isEmpty()) {
//                return ResponseEntity.status(400).body("No file selected");
//            }
//
//            System.out.println("Marks Card file received: " + file.getOriginalFilename());
//            saveFile(file, "C:/Users/nithya prashanth/Desktop/images/student/marksCard/");
//            return ResponseEntity.ok("Marks Card uploaded successfully");
//        } catch (IOException e) {
//            e.printStackTrace();  // Log the error
//            return ResponseEntity.status(500).body("Failed to upload Marks Card: " + e.getMessage());
//        } catch (Exception e) {
//            e.printStackTrace();  // Log the error
//            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
//        }
//    }
//
//    @PostMapping("/upload-photo")
//    public ResponseEntity<String> uploadPhoto(@RequestParam("photo") MultipartFile file) {
//
//        try {
//            if (file.isEmpty()) {
//                return ResponseEntity.status(400).body("No file selected");
//            }
//
//            System.out.println("Photo file received: " + file.getOriginalFilename());
//            saveFile(file, "C:/Users/nithya prashanth/Desktop/images/student/photo/");
//            return ResponseEntity.ok("Photo uploaded successfully");
//
//        } catch (IOException e) {
//            e.printStackTrace();  // Log the error
//            return ResponseEntity.status(500).body("Failed to upload Photo: " + e.getMessage());
//        } catch (Exception e) {
//            e.printStackTrace();  // Log the error
//            return ResponseEntity.status(500).body("Unexpected error: " + e.getMessage());
//        }
//    }
//
//
//

}
