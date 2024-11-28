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


//    @PostMapping("/upload")
//    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file,
//                                                          @RequestParam("documentType") String documentType,
//                                                          @RequestParam("fileName") String fileName,
//                                                          @RequestParam("fileType") String fileType,
//                                                          @RequestParam("uploadDate") String uploadDate,
//                                                          @RequestParam("userEmail") String userEmail,
//                                                          @RequestParam("semester") String semester,
//                                                          @RequestParam("documentCategory") String documentCategory) {
//
//        Map<String, String> response = new HashMap<>();
//        if (file.isEmpty()) {
//            response.put("message", "File upload failed: File is empty");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//        }
//
//        try {
//            String uploadDir = getUploadDirectory(semester);
//            String originalFilename = file.getOriginalFilename();
//            String sanitizedFilename = originalFilename.replaceAll("[<>:\"/\\|?*]", "_");
//            String semesterSpecificFilename = semester + "_" + sanitizedFilename;
//            Path path = Paths.get(uploadDir + semesterSpecificFilename);
//
//            if (Files.exists(path)) {
//                response.put("message", "File with the same name already exists in this semester");
//                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
//            }
//
//            Files.createDirectories(path.getParent());
//            Files.copy(file.getInputStream(), path);
//            response.put("message", "File uploaded successfully: " + semesterSpecificFilename);
//            response.put("downloadUrl", "/files/" + semesterSpecificFilename);
//
//            AllDocument document = new AllDocument();
//            document.setDocumentType(documentType);
//            document.setFileName(semesterSpecificFilename);
//            document.setUploadDate(uploadDate);
//            document.setFileType(fileType);
//            document.setSemester(semester);
//            document.setDocumentCategory(documentCategory);
//
//            Optional<User> userOptional = userRepo.findByEmail(userEmail);
//            if (userOptional.isPresent()) {
//                document.setUser(userOptional.get());
//            } else {
//                response.put("message", "User not found");
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
//            }
//
//            allDocumentRepo.save(document);
//
//            response.put("documentId", document.getDocId().toString());
//            response.put("uploadDate", document.getUploadDate());
//            response.put("documentType", document.getDocumentType());
//            response.put("documentCategory", document.getDocumentCategory());
//
//            return ResponseEntity.ok(response);
//        } catch (IOException e) {
//            e.printStackTrace();
//            response.put("message", "File upload failed: " + e.getMessage());
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//        }
//    }


    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file,
                                                          @RequestParam("documentType") String documentType,
                                                          @RequestParam("fileName") String fileName,
                                                          @RequestParam("fileType") String fileType,
                                                          @RequestParam("uploadDate") String uploadDate,
                                                          @RequestParam("userEmail") String userEmail,
                                                          @RequestParam("semester") String semester,
                                                          @RequestParam("documentCategory") String documentCategory) {
        Map<String, String> response = new HashMap<>();
        if (file.isEmpty()) {
            response.put("message", "File upload failed: File is empty");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        try {
            String uploadDir = getUploadDirectory(semester);
            String sanitizedFilename = fileName.replaceAll("[<>:\"/\\|?*]", "_");
            String semesterSpecificFilename = semester + "_" + sanitizedFilename;
            Path filePath = Paths.get(uploadDir + semesterSpecificFilename);

            if (Files.exists(filePath)) {
                response.put("message", "File with the same name already exists in this semester");
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }

            Files.createDirectories(filePath.getParent());
            Files.copy(file.getInputStream(), filePath);

            String documentPath = filePath.toString();

            AllDocument document = new AllDocument();
            document.setDocumentType(documentType);
            document.setFileName(semesterSpecificFilename);
            document.setUploadDate(uploadDate);
            document.setFileType(fileType);
            document.setSemester(semester);
            document.setDocumentCategory(documentCategory);
            document.setDocumentPath(documentPath); // Set the document path

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
            response.put("documentPath", document.getDocumentPath()); // Include documentPath in response

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            e.printStackTrace();
            response.put("message", "File upload failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }





    @GetMapping("/category/{documentCategory}/{semester}")
    public ResponseEntity<List<AllDocument>> getDocumentsByCategoryAndSemester(
            @PathVariable("documentCategory") String documentCategory,
            @PathVariable("semester") String semester) {
        List<AllDocument> documents = allDocumentRepo.findBySemesterAndDocumentCategory(semester, documentCategory);
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



    @GetMapping("/viewFile/{semester}/{filename:.+}")
    public ResponseEntity<?> viewFile(@PathVariable String semester, @PathVariable String filename) {
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

            // If the file is a text, image, PDF, or office document, try to open it in the browser
            if (mimeType.startsWith("text/") || mimeType.startsWith("image/") || mimeType.equals("application/pdf")) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, mimeType)
                        .body(resource);
            }

            // Add handling for Word, Excel, PowerPoint files
            if (mimeType.equals("application/msword") || mimeType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, mimeType)
                        .body(resource);
            }

            if (mimeType.equals("application/vnd.ms-excel") || mimeType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, mimeType)
                        .body(resource);
            }

            if (mimeType.equals("application/vnd.ms-powerpoint") || mimeType.equals("application/vnd.openxmlformats-officedocument.presentationml.presentation")) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, mimeType)
                        .body(resource);
            }

            // If not a supported type, prompt for download
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, mimeType)
                    .body(resource);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}



