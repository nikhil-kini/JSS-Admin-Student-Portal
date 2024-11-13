package com.example.adminlogin.controller;

import com.example.adminlogin.model.Staff;
import com.example.adminlogin.repository.StaffRepo;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/staff")
public class StaffController {
    @Autowired
    private StaffRepo staffRepo;

    // Hardcoded directory paths for file uploads
    private static final String SSLM_MARKS_CARD_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/sslcMarksCard/";
    private static final String BE_MARKS_CARD_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/beMarksCard/";
    private static final String DEGREE_CERTIFICATE_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/degreeCertificate/";
    private static final String PHOTO_DIR = "C:/Users/nithya prashanth/Desktop/images/staff/photo/";

    @PostMapping("/register")
    public ResponseEntity<?> registerStaff(
            @RequestParam("staffName") String staffName,
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
            Staff staff = new Staff();
            staff.setStaffName(staffName);
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
            staffRepo.save(staff);

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
            List<Staff> staffList = staffRepo.findAll();
            return ResponseEntity.ok().body(staffList);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving staff data: " + e.getMessage());
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateStaff(@PathVariable Long id, @RequestBody Staff updatedStaff) {
        return staffRepo.findById(id).map(staff -> {
            staff.setStaffName(updatedStaff.getStaffName());
            staff.setEmail(updatedStaff.getEmail());
            staff.setPhoneno(updatedStaff.getPhoneno());
            staff.setAddress(updatedStaff.getAddress());
            staff.setAdharno(updatedStaff.getAdharno());
            // Update any other necessary fields here
            staffRepo.save(staff);
            return ResponseEntity.ok().body("Staff updated successfully!");
        }).orElse(ResponseEntity.status(404).body("Staff not found"));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable Long id) {
        if (staffRepo.existsById(id)) {
            staffRepo.deleteById(id);
            return ResponseEntity.ok().body("Staff deleted successfully!");
        } else {
            return ResponseEntity.status(404).body("Staff not found");
        }
    }


}