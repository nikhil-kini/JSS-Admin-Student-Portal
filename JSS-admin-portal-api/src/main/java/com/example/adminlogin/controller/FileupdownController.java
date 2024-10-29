//package com.example.adminlogin.controller;
//
//import org.springframework.beans.factory.annotation.Value; // Import the correct Value annotation
//import org.springframework.core.io.Resource; // This is needed
//import org.springframework.core.io.UrlResource;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.IOException;
//import java.net.MalformedURLException;
//import java.nio.file.Files;
//import java.nio.file.Path; // Use the correct Path import
//import java.nio.file.Paths;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@CrossOrigin(origins = "http://localhost:4200")
//@RestController
//@RequestMapping("/api/files")
//public class FileupdownController {
//    private final String uploadDir = "C:/Users/nithya prashanth/Desktop/images/upload/1st year/sem1/";
//
//    @PostMapping("/upload")
//    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
//        Map<String, String> response = new HashMap<>();
//
//        if (file.isEmpty()) {
//            response.put("message", "File upload failed: File is empty");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//        }
//
//        try {
//            String originalFilename = file.getOriginalFilename();
//            String sanitizedFilename = originalFilename.replaceAll("[<>:\"/\\|?*]", "_");
//            Path path = Paths.get(uploadDir + sanitizedFilename);
//
//            // Check if file already exists
//            if (Files.exists(path)) {
//                response.put("message", "File with the same name already exists");
//                return ResponseEntity.status(HttpStatus.CONFLICT).body(response); // 409 Conflict
//            }
//
//            // Proceed with file upload
//            Files.createDirectories(path.getParent());
//            Files.copy(file.getInputStream(), path);
//            response.put("message", "File uploaded successfully: " + sanitizedFilename);
//            response.put("downloadUrl", "/files/" + sanitizedFilename);
//            return ResponseEntity.ok(response);
//        } catch (IOException e) {
//            e.printStackTrace();
//            response.put("message", "File upload failed: " + e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//        }
//    }
//
//    @GetMapping("/list")
//    public ResponseEntity<List<String>> listFiles() {
//        List<String> fileNames = new ArrayList<>();
//        try {
//            Files.list(Paths.get(uploadDir))
//                    .forEach(path -> fileNames.add(path.getFileName().toString()));
//            return ResponseEntity.ok(fileNames);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(fileNames);
//        }
//    }
//
//
//    @GetMapping("/download/{filename:.+}")
//    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
//        try {
//            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
//            Resource resource = new UrlResource(filePath.toUri());
//
//            if (!resource.exists()) {
//                return ResponseEntity.notFound().build();
//            }
//
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
//                    .body(resource);
//        } catch (MalformedURLException e) {
//            return ResponseEntity.badRequest().build();
//        }
//    }
//}