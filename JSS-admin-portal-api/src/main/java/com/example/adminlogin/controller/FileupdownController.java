package com.example.adminlogin.controller;

import org.springframework.beans.factory.annotation.Value; // Import the correct Value annotation
import org.springframework.core.io.Resource; // This is needed
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path; // Use the correct Path import
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/files")
public class FileupdownController {
    private final String uploadDir = "C:/Users/nithya prashanth/Desktop/images/upload/sem1/"; // Absolute path

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        Map<String, String> response = new HashMap<>();

        if (file.isEmpty()) {
            response.put("message", "File upload failed: File is empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        try {
            String originalFilename = file.getOriginalFilename();
            // Sanitize the filename to remove illegal characters
            String sanitizedFilename = originalFilename.replaceAll("[<>:\"/\\|?*]", "_");
            Path path = Paths.get(uploadDir + sanitizedFilename);

            // Create parent directories if they do not exist
            Files.createDirectories(path.getParent());

            Files.copy(file.getInputStream(), path);
            response.put("message", "File uploaded successfully: " + sanitizedFilename);
            response.put("downloadUrl", "/files/" + sanitizedFilename);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace();
            response.put("message", "File upload failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            // Sanitize the filename to prevent path traversal
            String sanitizedFilename = filename.replaceAll("[<>:\"/\\|?*]", "_");
            Path path = Paths.get(uploadDir + sanitizedFilename);
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
    //    @GetMapping("/download/{filename}")
//    public ResponseEntity<org.springframework.core.io.Resource> downloadFile(@PathVariable String filename) {
//        try {
//            Path path = Paths.get(uploadDir + filename);
//            Resource resource = new UrlResource(path.toUri());
//
//            if (resource.exists() || resource.isReadable()) {
//                return ResponseEntity.ok()
//                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
//                        .body(resource);
//            } else {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//            }
//        } catch (MalformedURLException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }
//}

//@GetMapping("/download/{filename}")
//public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
//    try {
//        Path path = Paths.get(uploadDir + filename);
//        Resource resource = new UrlResource(path.toUri());
//
//        if (resource.exists() || resource.isReadable()) {
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
//                    .body(resource);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//    } catch (MalformedURLException e) {
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//    }
//}

