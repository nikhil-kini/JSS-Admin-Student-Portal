package com.example.adminlogin.controller;

import com.example.adminlogin.model.Pdocument;
import com.example.adminlogin.model.User;
import com.example.adminlogin.repository.PdocuRepo;
import com.example.adminlogin.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;
import static org.hibernate.query.sqm.tree.SqmNode.log;
//@CrossOrigin(origins = "*")
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/pdocu")

public class PersonalDocuController {


    private final String uploadDir = "C:/Users/nithya prashanth/Desktop/images/personaldocupload/";

    @Autowired
    private PdocuRepo pdocuRepo;

    @Autowired
    private UserRepo userRepo;




    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file,
                                                          @RequestParam("fileName") String fileName,
                                                          @RequestParam("fileType") String fileType,
                                                          @RequestParam("uploadDate") String uploadDate,
                                                          @RequestParam("userId") String userId) {

        Map<String, String> response = new HashMap<>();
        if (file.isEmpty()) {
            response.put("message", "File upload failed: File is empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        try {
            String sanitizedFilename = fileName.replaceAll("[<>:\"/\\|?*]", "_");
            Path path = Paths.get(uploadDir, sanitizedFilename);

            if (Files.exists(path)) {
                response.put("message", "File with the same name already exists");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            Files.createDirectories(path.getParent());
            Files.copy(file.getInputStream(), path);

            response.put("message", "File uploaded successfully: " + sanitizedFilename);

            Pdocument pdocument = new Pdocument();
            pdocument.setFileName(sanitizedFilename);
            pdocument.setUploadDate(uploadDate);
            pdocument.setFileType(fileType);

            Optional<User> userOptional = userRepo.findByEmail(userId);
            userOptional.ifPresent(pdocument::setUser);

            pdocuRepo.save(pdocument);

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace();
            response.put("message", "File upload failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // List uploaded files
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

    // Download file
    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            // Check if the file exists
            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            // Get MIME type of the file
            String contentType = Files.probeContentType(filePath);
            if (contentType == null) {
                contentType = "application/octet-stream"; // Default binary stream if MIME type can't be determined
            }

            // Check if the file is .doc or .docx and redirect to Google Docs viewer
            if (filename.endsWith(".doc") || filename.endsWith(".docx")) {
                String fileUrl = "http://localhost:8080/api/pdocu/download/" + filename; // Update with your base URL if not localhost
                String viewerUrl = "https://docs.google.com/viewer?url=" + fileUrl;

                // Redirect the user to Google Docs Viewer for .doc/.docx files
                return ResponseEntity.status(HttpStatus.FOUND)
                        .header(HttpHeaders.LOCATION, viewerUrl)
                        .build();
            }

            // Serve the file inline for browsers that support it
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .contentType(org.springframework.http.MediaType.parseMediaType(contentType))
                    .body(resource);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


   }