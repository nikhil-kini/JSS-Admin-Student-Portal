package com.example.adminlogin.controller;

import com.example.adminlogin.model.AllDocument;
import com.example.adminlogin.model.User;
import com.example.adminlogin.repository.AllDocumentRepo;

import com.example.adminlogin.repository.UserRepo;
import org.springframework.core.io.UrlResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;



import org.springframework.core.io.Resource;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/alldocuments")
public class AllDocumentController {
    @Autowired
    private AllDocumentRepo allDocumentRepo;

    @Autowired
    private UserRepo userRepo;

    private String getUploadDirectory(String semester) {
        Map<String, String> semesterDirectories = new HashMap<>();
        semesterDirectories.put("Sem1", "C:/Users/nithya prashanth/Desktop/images/alldocuments/sem1/");
        semesterDirectories.put("Sem2", "C:/Users/nithya prashanth/Desktop/images/alldocuments/sem2/");
        semesterDirectories.put("Sem3", "C:/Users/nithya prashanth/Desktop/images/alldocuments/sem3/");
        semesterDirectories.put("Sem4", "C:/Users/nithya prashanth/Desktop/images/alldocuments/sem4/");
        semesterDirectories.put("Sem5", "C:/Users/nithya prashanth/Desktop/images/alldocuments/sem5/");
        semesterDirectories.put("Sem6", "C:/Users/nithya prashanth/Desktop/images/alldocuments/sem6/");

        return semesterDirectories.getOrDefault(semester, "C:/Users/nithya prashanth/Desktop/images/alldocuments/sem1/");
    }



    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file,
                                                          @RequestParam("documentType") String documentType,
                                                          @RequestParam("fileName") String fileName,
                                                          @RequestParam("fileType") String fileType,
                                                          @RequestParam("uploadDate") String uploadDate,
                                                          @RequestParam("userEmail") String userEmail,  // Change to userEmail
                                                          @RequestParam("semester") String semester,
                                                          @RequestParam("documentCategory") String documentCategory) {

        Map<String, String> response = new HashMap<>();
        if (file.isEmpty()) {
            response.put("message", "File upload failed: File is empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        try {
            String uploadDir = getUploadDirectory(semester);
            String originalFilename = file.getOriginalFilename();
            String sanitizedFilename = originalFilename.replaceAll("[<>:\"/\\|?*]", "_");
            String semesterSpecificFilename = semester + "_" + sanitizedFilename;
            Path path = Paths.get(uploadDir + semesterSpecificFilename);

            if (Files.exists(path)) {
                response.put("message", "File with the same name already exists in this semester");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            Files.createDirectories(path.getParent());
            Files.copy(file.getInputStream(), path);
            response.put("message", "File uploaded successfully: " + semesterSpecificFilename);
            response.put("downloadUrl", "/files/" + semesterSpecificFilename);

            AllDocument document = new AllDocument();
            document.setDocumentType(documentType);
            document.setFileName(semesterSpecificFilename);
            document.setUploadDate(uploadDate);
            document.setFileType(fileType);
            document.setSemester(semester);
            document.setDocumentCategory(documentCategory);  // Store the category (LessonPlan, TeachingAids, QuestionBank)

            // Find the user by email instead of userId
            Optional<User> userOptional = userRepo.findByEmail(userEmail);  // Query by email
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
            response.put("documentCategory", document.getDocumentCategory());  // Include the document category in the response

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace();
            response.put("message", "File upload failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<AllDocument>> getDocumentsByCategory(@PathVariable String category) {
        List<AllDocument> documents = allDocumentRepo.findByDocumentCategory(category);
        return ResponseEntity.ok(documents);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<AllDocument>> getDocumentsByUserId(@PathVariable Long id) {
        List<AllDocument> documents = allDocumentRepo.findByUserId(id);
        return ResponseEntity.ok(documents);
    }

    @GetMapping("/{documentId}")
    public ResponseEntity<AllDocument> getDocumentById(@PathVariable Long documentId) {
        Optional<AllDocument> documentOptional = allDocumentRepo.findById(documentId);
        return documentOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/list")
    public ResponseEntity<List<String>> listUploadedFiles(@RequestParam String semester) {
        try {
            String uploadDir = getUploadDirectory(semester);
            File folder = new File(uploadDir);
            if (!folder.exists() || !folder.isDirectory()) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Collections.singletonList("Error: Directory not found"));
            }

            File[] files = folder.listFiles();
            if (files != null && files.length > 0) {
                List<String> fileNames = Arrays.stream(files)
                        .filter(File::isFile)
                        .map(File::getName)
                        .collect(Collectors.toList());
                return ResponseEntity.ok(fileNames);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonList("Error: Unable to fetch file list"));
        }
    }

    @GetMapping("/download/{semester}/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String semester, @PathVariable String filename) {
        try {
            String uploadDir = getUploadDirectory(semester);
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();

            if (!Files.exists(filePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

            String mimeType = Files.probeContentType(filePath);
            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, mimeType)
                    .body(resource);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
