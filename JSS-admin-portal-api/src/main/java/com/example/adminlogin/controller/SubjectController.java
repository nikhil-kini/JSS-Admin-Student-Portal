package com.example.adminlogin.controller;

import com.example.adminlogin.model.AllDocument;
import com.example.adminlogin.model.Subject;
import com.example.adminlogin.model.User;
import com.example.adminlogin.repository.AllDocumentRepo;
import com.example.adminlogin.repository.SubjectRepo;
import com.example.adminlogin.repository.UserRepo;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "*")
public class SubjectController {
    @Autowired
    private SubjectRepo subjectRepository;
    
    @Autowired
    private AllDocumentRepo allDocumentRepo;

    @Autowired
    private UserRepo userRepo;

    @PostMapping
    public ResponseEntity<Subject> createSubject(@RequestBody Subject subject) {
        Subject savedSubject = subjectRepository.save(subject);
        return new ResponseEntity<>(savedSubject, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subject> updateSubject(@PathVariable Long id, @RequestBody Subject subject) {
        subject.setId(id);
        Subject updatedSubject = subjectRepository.save(subject);
        return ResponseEntity.ok(updatedSubject);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        subjectRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


    @GetMapping("/semesters")
    public ResponseEntity<List<String>> getAllSemesters() {
        List<String> semesters = subjectRepository.findAll().stream()
                .map(Subject::getSemester)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
        return ResponseEntity.ok(semesters);
    }

    @GetMapping("/semester/{semester}")
    public ResponseEntity<List<Subject>> getSubjectsBySemester(@PathVariable String semester) {
        List<Subject> subjects = subjectRepository.findBySemester(semester);
        return ResponseEntity.ok(subjects);
    }




    private static final String BASE_DIR = Paths.get(System.getProperty("user.home"), "myAppData", "alldocuments").toString();

    // Create the folder structure when the controller initializes
    @PostConstruct
    public void init() {
        // Define subfolders for each semester
        String[] semesters = {"sem1", "sem2", "sem3", "sem4", "sem5", "sem6"};

        // Create the base directory if it doesn't exist
        File baseDir = new File(BASE_DIR);
        if (!baseDir.exists()) {
            boolean created = baseDir.mkdirs();
            if (created) {
                System.out.println("Created base directory: " + BASE_DIR);
            } else {
                System.out.println("Failed to create base directory: " + BASE_DIR);
            }
        }

        // Create semester folders
        for (String semester : semesters) {
            File semesterDir = new File(BASE_DIR, semester);
            if (!semesterDir.exists()) {
                boolean created = semesterDir.mkdir();
                if (created) {
                    System.out.println("Created semester directory: " + semesterDir.getPath());
                } else {
                    System.out.println("Failed to create semester directory: " + semesterDir.getPath());
                }
            }
        }
    }

    
    private String getUploadDirectory(String semester) {
        return Paths.get(BASE_DIR, semester).toString(); // Return the specific semester folder path
    }
    
    @PostMapping("/upload-ia-marks")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentType,
            @RequestParam("fileName") String fileName,
            @RequestParam("fileType") String fileType,
            @RequestParam("uploadDate") String uploadDate,
            @RequestParam("userEmail") String userEmail,
            @RequestParam("semester") String semester,
            @RequestParam("documentCategory") String documentCategory,
            @RequestParam("month") String month,
            @RequestParam("subject") String subject) {
Map<String, String> response = new HashMap<>();
if (file.isEmpty()) {
response.put("message", "File upload failed: File is empty");
return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
}

try {
// Get the upload directory for the specific semester
String uploadDir = getUploadDirectory(semester);
String sanitizedFilename = fileName.replaceAll("[<>:\"/\\|?*]", "_");
String semesterSpecificFilename = sanitizedFilename;

// Create the semester folder if it doesn't exist
Path uploadPath = Paths.get(uploadDir);
if (!Files.exists(uploadPath)) {
Files.createDirectories(uploadPath);
}

// Define the path to store the file
Path filePath = uploadPath.resolve(semesterSpecificFilename);
Files.copy(file.getInputStream(), filePath);

// Prepare document object to save
AllDocument document = new AllDocument();
document.setDocumentType(documentType);
document.setFileName(semesterSpecificFilename);
document.setUploadDate(uploadDate);
document.setFileType(fileType);
document.setSemester(semester);
document.setDocumentCategory(documentCategory);
document.setDocumentPath(filePath.toString());
document.setMonth(month);
document.setSubject(subject);

Optional<User> userOptional = userRepo.findByEmail(userEmail);
if (userOptional.isPresent()) {
document.setUser(userOptional.get());
} else {
response.put("message", "User not found");
return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
}

allDocumentRepo.save(document);

response.put("documentId", document.getDocId().toString());
response.put("uploadDate", document.getUploadDate());
response.put("documentType", document.getDocumentType());
response.put("documentCategory", document.getDocumentCategory());
response.put("documentPath", document.getDocumentPath());

return ResponseEntity.ok(response);
} catch (IOException e) {
e.printStackTrace();
response.put("message", "File upload failed: " + e.getMessage());
return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
}
}
//    public ResponseEntity<?> uploadIAMarks(
//            @RequestParam("file") MultipartFile file,
//            @RequestParam("subjectId") Long subjectId,
//            @RequestParam("userId") Long userId) {
//        try {
//            Subject subject = subjectRepository.findById(subjectId)
//                    .orElseThrow(() -> new RuntimeException("Subject not found"));
//
//            // Get semester folder path
//            String semesterFolder = "sem" + subject.getSemester().replaceAll("\\D+", "");
//            String uploadDirectory = Paths.get(BASE_DIR, semesterFolder).toString();
//
//            // Generate unique filename
//            String originalFilename = file.getOriginalFilename();
//            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
//            String uniqueFilename = System.currentTimeMillis() + "_" + subjectId + fileExtension;
//
//            // Create full file path
//            String filePath = Paths.get(uploadDirectory, uniqueFilename).toString();
//
//            // Save file to disk
//            File destinationFile = new File(filePath);
//            file.transferTo(destinationFile);
//
//            // Update subject with file information
//            subject.setFileName(originalFilename);
//            subject.setFilePath(filePath);
//            subject.setFileType(file.getContentType());
//            subject.setUploadedDate(LocalDateTime.now());
//            subject.setUserId(userId);
//
//            subjectRepository.save(subject);
//
//            return ResponseEntity.ok().body(Map.of(
//                    "message", "File uploaded successfully",
//                    "fileName", originalFilename,
//                    "filePath", filePath
//            ));
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Map.of("error", "Failed to upload file: " + e.getMessage()));
//        }
//    }

    // Optional: Add method to get the file path for a specific semester
    private String getSemesterPath(String semester) {
        return Paths.get(BASE_DIR, "sem" + semester.replaceAll("\\D+", "")).toString();
    }

    // Optional: Add method to check if directories exist
    private boolean checkDirectoryStructure() {
        File baseDir = new File(BASE_DIR);
        if (!baseDir.exists()) {
            return false;
        }

        for (int i = 1; i <= 6; i++) {
            File semDir = new File(BASE_DIR, "sem" + i);
            if (!semDir.exists()) {
                return false;
            }
        }
        return true;
    }

}

