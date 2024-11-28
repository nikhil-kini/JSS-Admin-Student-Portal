package com.example.adminlogin.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.core.io.UrlResource;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/updown")

public class TimetableController {
    private final Path fileStorageLocation = Paths.get("C:/Users/nithya prashanth/Desktop/images/upload").toAbsolutePath().normalize();

    public TimetableController() throws IOException {
        Files.createDirectories(fileStorageLocation); // Ensure the upload directory exists
    }

    // Endpoint to upload a file
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Generate the file path
            String fileName = file.getOriginalFilename();
            Path targetLocation = fileStorageLocation.resolve(fileName);

            // Save the file to the server
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Return success response
            return ResponseEntity.ok(Map.of("message", "File uploaded successfully!"));
        } catch (IOException ex) {
            // Return error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Could not upload the file: " + ex.getMessage()));
        }
    }

    // Endpoint to list all uploaded files
    @GetMapping("/files")
    public ResponseEntity<List<Map<String, String>>> listFiles() {
        try {
            List<Map<String, String>> files = new ArrayList<>();

            // List all files in the directory
            Files.list(fileStorageLocation).forEach(path -> {
                Map<String, String> fileInfo = new HashMap<>();
                fileInfo.put("name", path.getFileName().toString());
                fileInfo.put("url", "/updown/files/" + path.getFileName().toString()); // Generate the file URL
                files.add(fileInfo);
            });

            // Return the list of files
            return ResponseEntity.ok(files);
        } catch (IOException ex) {
            // Return error response if file listing fails
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    // Endpoint to download (or open in the browser) a file
    @GetMapping("/files/{fileName}")
    public ResponseEntity<Resource> openFile(@PathVariable String fileName) {
        try {
            // Get the file path
            Path filePath = fileStorageLocation.resolve(fileName).normalize();
            System.out.println("Trying to serve file from: " + filePath);
            Resource resource = new UrlResource(filePath.toUri());

            // Check if file exists
            if (resource.exists()) {
                // Determine the content type of the file
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream"; // Default content type
                }

                // Return the file with the correct content type (file will open in browser)
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType)) // Correct content type
                        .body(resource);
            } else {
                // Return 404 if file is not found
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (IOException ex) {
            // Return error response if there is an issue opening the file
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

//    // Directly specify the upload directory in the controller
//    private final String uploadDir = "C:/Users/nithya prashanth/Desktop/images/uploaded/";
//
//    // Endpoint for file upload
//    @PostMapping("/upload")
//    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
//        if (file.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body(Map.of("message", "Please select a file to upload"));
//        }
//
//        try {
//            // Create the upload directory if it doesn't exist
//            Path uploadPath = Paths.get(uploadDir);
//            if (!Files.exists(uploadPath)) {
//                Files.createDirectories(uploadPath);
//            }
//
//            // Get the file's original filename and create a path
//            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//            Path targetPath = uploadPath.resolve(fileName);
//
//            // Copy the file to the target location
//            file.transferTo(targetPath);
//
//            return ResponseEntity.ok().body(Map.of("message", "File uploaded successfully", "fileName", fileName));
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(Map.of("message", "Could not upload the file!"));
//        }
//    }
//
//    // Endpoint to retrieve all uploaded files (for listing purposes)
//    @GetMapping("/files")
//    public ResponseEntity<List<String>> listUploadedFiles() {
//        File folder = new File(uploadDir);
//        File[] listOfFiles = folder.listFiles();
//
//        List<String> fileNames = new ArrayList<>();
//        if (listOfFiles != null) {
//            for (File file : listOfFiles) {
//                if (file.isFile()) {
//                    fileNames.add(file.getName());
//                }
//            }
//        }
//
//        return ResponseEntity.ok(fileNames);
//    }
//
//
//    @GetMapping("/files/{fileName}")
//    @ResponseBody
//    public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
//        Path filePath = Paths.get(uploadDir).resolve(fileName);
//        Resource resource = new FileSystemResource(filePath);
//
//        if (resource.exists()) {
//            // Determine the content type based on the file extension
//            String contentType = null;
//            try {
//                contentType = Files.probeContentType(filePath);
//            } catch (IOException e) {
//                contentType = "application/octet-stream"; // Default type if unable to determine
//            }
//
//            return ResponseEntity.ok()
//                    .contentType(MediaType.parseMediaType(contentType)) // Set the appropriate content type
//                    .body(resource); // Return the file content without "attachment" header
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//    }
//
//}




