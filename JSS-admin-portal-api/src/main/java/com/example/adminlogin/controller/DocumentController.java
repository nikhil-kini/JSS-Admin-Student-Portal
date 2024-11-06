package com.example.adminlogin.controller;

import com.example.adminlogin.model.Document;
import com.example.adminlogin.model.User;
import com.example.adminlogin.repository.DocumentRepo;
import com.example.adminlogin.repository.UserRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;



import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/files")
public class DocumentController {

    @Autowired
    private DocumentRepo documentRepo;

    @Autowired
    private UserRepo userRepo;

    private String getUploadDirectory(String semester) {
        Map<String, String> semesterDirectories = new HashMap<>();
        semesterDirectories.put("sem1", "C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem1/");
        semesterDirectories.put("sem2", "C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem2/");
        semesterDirectories.put("sem3", "C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem3/");
        semesterDirectories.put("sem4", "C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem4/");
        semesterDirectories.put("sem5", "C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem5/");
        semesterDirectories.put("sem6", "C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem6/");

        // Default to sem1 if no valid semester is provided
        return semesterDirectories.getOrDefault(semester, "C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem1/");
    }

//    public String getUploadDirectory(String semester) {
//        // Replace this with your logic to return the correct directory based on the semester
//        switch (semester) {
//            case "sem1":
//                return "C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem1/";
//            case "sem2":
//                return "C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem2/";
//            case "sem3":
//                return "C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem3/";
//            case "sem4":
//                return "C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem4/";
//            case "sem5":
//                return "C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem5/";
//            case "sem6":
//                return "C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/sem6/";
//            default:
//                throw new IllegalArgumentException("Invalid semester: " + semester);
//        }
//    }

//    private final String uploadDir = "C:/Users/nithya prashanth/Desktop/images/teachingaiddocupload/1st year/";



    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file,
                                                          @RequestParam("documentType") String documentType,
                                                          @RequestParam("fileName") String fileName,
                                                          @RequestParam("fileType") String fileType,
                                                          @RequestParam("uploadDate") String uploadDate,
                                                          @RequestParam("userId") String userId,
                                                          @RequestParam("semester") String semester) {

        Map<String, String> response = new HashMap<>();
        if (file.isEmpty()) {
            response.put("message", "File upload failed: File is empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        try {
            // Determine the upload directory based on semester
            String uploadDir = getUploadDirectory(semester);

            String originalFilename = file.getOriginalFilename();

            // Sanitize the filename to remove illegal characters
            String sanitizedFilename = originalFilename.replaceAll("[<>:\"/\\|?*]", "_");

            // Modify the filename to include the semester, so files can be uploaded multiple times
            String semesterSpecificFilename = semester + "_" + sanitizedFilename;

            Path path = Paths.get(uploadDir + semesterSpecificFilename);

            // Check if file already exists in the chosen semester directory
            if (Files.exists(path)) {
                response.put("message", "File with the same name already exists in this semester");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response); // 409 Conflict
            }

            // Proceed with file upload
            Files.createDirectories(path.getParent());
            Files.copy(file.getInputStream(), path);
            response.put("message", "File uploaded successfully: " + semesterSpecificFilename);
            response.put("downloadUrl", "/files/" + semesterSpecificFilename);

            // Create Document object and set properties
            Document document = new Document();
            document.setDocumentType(documentType);
            document.setFileName(semesterSpecificFilename);  // Save the file with the semester-specific filename
            document.setUploadDate(uploadDate);
            document.setFileType(fileType);
            document.setSemester(semester);  // Set the selected semester

            // Find user by email and set the document's user
            Optional<User> userOptional = userRepo.findByEmail(userId);
            if (userOptional.isPresent()) {
                document.setUser(userOptional.get());
            } else {
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            // Save the document in the database
            documentRepo.save(document);

            // Add more information to the response
            response.put("documentId", document.getDocId().toString());  // Add document ID to the response
            response.put("uploadDate", document.getUploadDate());  // Add upload date to the response
            response.put("documentType", document.getDocumentType());  // Add document type to the response

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace();
            response.put("message", "File upload failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }





    // Get all documents by user ID
    @GetMapping("/user/{id}")
    public ResponseEntity<List<Document>> getDocumentsByUserId(@PathVariable Long id) {
        List<Document> documents = documentRepo.findByUserId(id);
        return ResponseEntity.ok(documents);
    }

    // Get Document by ID
    @GetMapping("/{documentId}")
    public ResponseEntity<Document> getDocumentById(@PathVariable Long documentId) {
        Optional<Document> documentOptional = documentRepo.findById(documentId);
        return documentOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Delete Document
//    @DeleteMapping("/delete/{filename:.+}")
//    public ResponseEntity<String> deleteFile(@PathVariable String filename) {
//        try {
//            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
//            File fileToDelete = filePath.toFile();
//
//            // Check if file exists before deleting
//            if (!fileToDelete.exists()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("File not found.");
//            }
//
//            // Delete the file
//            if (fileToDelete.delete()) {
//                // Optionally, also delete the document record from the database
//                // Assuming DocumentRepo has a method to find by file name
//                documentRepo.deleteByFileName(filename); // Create this method in your repository if it doesn't exist
//                return ResponseEntity.ok("File deleted successfully.");
//            } else {
//                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File deletion failed.");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting file: " + e.getMessage());
//        }
//    }


//    @GetMapping("/list")
//    public ResponseEntity<List<String>> listUploadedFiles() {
//        File folder = new File(uploadDir());
//        File[] files = folder.listFiles();
//
//        if (files != null) {
//            List<String> fileNames = Arrays.stream(files)
//                    .map(File::getName)
//                    .collect(Collectors.toList());
//            return ResponseEntity.ok(fileNames);
//        }
//
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//    }



    @GetMapping("/list")
    public ResponseEntity<List<String>> listUploadedFiles(@RequestParam String semester) {
        try {
            String uploadDir = getUploadDirectory(semester);  // Get directory based on semester

            // Create a File object pointing to the upload directory
            File folder = new File(uploadDir);

            // Check if the folder exists and is a directory
            if (!folder.exists() || !folder.isDirectory()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Collections.singletonList("Error: Directory not found"));
            }

            // Get a list of files from the directory
            File[] files = folder.listFiles();

            if (files != null && files.length > 0) {
                // Extract file names and return them in the response
                List<String> fileNames = Arrays.stream(files)
                        .filter(File::isFile)  // Only consider files, not directories
                        .map(File::getName)
                        .collect(Collectors.toList());
                return ResponseEntity.ok(fileNames);
            } else {
                // No files found in the directory
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonList("Error: Unable to fetch file list"));
        }
    }

//    @GetMapping("/download/{semester}/{filename:.+}")
//    public ResponseEntity<Resource> downloadFile(@PathVariable String semester, @PathVariable String filename) {
//        try {
//            String uploadDir = getUploadDirectory(semester);
//            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
//
//            if (!Files.exists(filePath)) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // 404 if file not found
//            }
//
//            Resource resource = new UrlResource(filePath.toUri());
//
//            if (!resource.exists()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // 404 if resource not found
//            }
//
//            String mimeType = Files.probeContentType(filePath);
//            if (mimeType == null) {
//                mimeType = "application/octet-stream";  // Default MIME type
//            }
//
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
//                    .header(HttpHeaders.CONTENT_TYPE, mimeType)
//                    .body(resource);
//
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();  // 500 if internal server error
//        }
//    }

    @GetMapping("/download/{semester}/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String semester, @PathVariable String filename) {
        try {
            String uploadDir = getUploadDirectory(semester);
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();

            if (!Files.exists(filePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // 404 if file not found
            }

            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // 404 if resource not found
            }

            String mimeType = Files.probeContentType(filePath);
            if (mimeType == null) {
                mimeType = "application/octet-stream";  // Default MIME type
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, mimeType)
                    .body(resource);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();  // 500 if internal server error
        }
    }
    @GetMapping("/viewText/{semester}/{filename:.+}")
    public ResponseEntity<String> viewTextFile(@PathVariable String semester, @PathVariable String filename) {
        try {
            String uploadDir = getUploadDirectory(semester);
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();

            if (!Files.exists(filePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            String content = new String(Files.readAllBytes(filePath), StandardCharsets.UTF_8);
            return ResponseEntity.ok(content);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}