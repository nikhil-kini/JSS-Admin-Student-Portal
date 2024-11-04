package com.example.adminlogin.controller;

import com.example.adminlogin.model.Document;
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
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

import static org.hibernate.query.sqm.tree.SqmNode.log;

@CrossOrigin
@RestController
@RequestMapping("/api/pdocu")
public class PersonalDocuController {

    private final String uploadDir = "C:/Users/nithya prashanth/Desktop/images/download/sem1/";

    @Autowired
    private PdocuRepo pdocuRepo;

    @Autowired
    private UserRepo userRepo;

//    @Autowired
//    public PersonalDocuController() {
//        File directory = new File(uploadDir);
//        if (!directory.exists()) {
//            directory.mkdir();
//        }
//    }



    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file,

                                                          @RequestParam("fileName") String fileName,
                                                          @RequestParam("fileType") String fileType,
                                                          @RequestParam("uploadDate") String uploadDate,
                                                          @RequestParam("userId") String userId) { // Changed to String

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
            Pdocument pdocument= new Pdocument();

            pdocument.setFileName(sanitizedFilename);
            pdocument.setUploadDate(uploadDate);
            pdocument.setFileType(fileType);

            // Find user by email and set the document's user
            Optional<User> userOptional = userRepo.findByEmail(userId); // Fetch user by email
            if (userOptional.isPresent()) {
                pdocument.setUser(userOptional.get());
            } else {
                response.put("message", "User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            pdocuRepo.save(pdocument);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace();
            response.put("message", "File upload failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

//    @GetMapping("/list")
//    public ResponseEntity<List<String>> listFiles() {
//        File folder = new File(uploadDir);
//        File[] listOfFiles = folder.listFiles();
//        List<String> fileNames = new ArrayList<>();
//        if (listOfFiles != null) {
//            for (File file : listOfFiles) {
//                if (file.isFile()) {
//                    fileNames.add(file.getName());
//                }
//            }
//        }
//        return ResponseEntity.ok(fileNames);
//    }
//
//    @GetMapping("/download/{fileName}")
//    public ResponseEntity<byte[]> downloadFile(@PathVariable String fileName) {
//        try {
//            Path path = Paths.get(uploadDir + fileName);
//            byte[] data = Files.readAllBytes(path);
//            return ResponseEntity.ok().body(data);
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//    }
//
//}

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
