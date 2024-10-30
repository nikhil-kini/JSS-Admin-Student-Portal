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

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/files")
public class DocumentController {

    @Autowired
    private DocumentRepo documentRepo;

    @Autowired
    private UserRepo userRepo;

    private final String uploadDir = "C:/Users/nithya prashanth/Desktop/images/upload/1st year/sem1/";

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file,
                                                          @RequestParam("documentType") String documentType,
                                                          @RequestParam("fileName") String fileName,
                                                          @RequestParam("fileType") String fileType,
                                                          @RequestParam("uploadDate") String uploadDate



    ) {
        Map<String, String> response = new HashMap<>();
        if (file.isEmpty()) {
            response.put("message", "File upload failed: File is empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        try {
            String originalFilename = file.getOriginalFilename();
            String sanitizedFilename = originalFilename.replaceAll("[<>:\"/\\|?*]", "_");
            Path path = Paths.get(uploadDir + sanitizedFilename);

            // Check if file already exists
            if (Files.exists(path)) {
                response.put("message", "File with the same name already exists");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response); // 409 Conflict
            }

            // Proceed with file upload
            Files.createDirectories(path.getParent());
            Files.copy(file.getInputStream(), path);
            response.put("message", "File uploaded successfully: " + sanitizedFilename);
            response.put("downloadUrl", "/files/" + sanitizedFilename);

            // Create Document object and set properties
            Document document = new Document();
            document.setDocumentType(documentType);
            document.setFileName(fileName);
            document.setUploadDate(uploadDate);
            document.setFileType(fileType);


            documentRepo.save(document);
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
    @DeleteMapping("/{documentId}")
    public ResponseEntity<String> deleteDocument(@PathVariable Long documentId) {
        if (!documentRepo.existsById(documentId)) {
            return ResponseEntity.status(404).body("Document not found.");
        }
        documentRepo.deleteById(documentId);
        return ResponseEntity.ok("Document deleted successfully.");
    }

    @GetMapping("/list")
    public ResponseEntity<List<String>> listUploadedFiles() {
        File folder = new File(uploadDir);
        File[] files = folder.listFiles();

        if (files != null) {
            List<String> fileNames = Arrays.stream(files)
                    .map(File::getName)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(fileNames);
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }

    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
