package com.example.adminlogin.controller;



import com.example.adminlogin.model.Fileupdown;
import com.example.adminlogin.repository.FileupdownRepo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.*;




@CrossOrigin(origins = "http://localhost:4200")
//@RestController
//@RequestMapping("/api/files")

@RestController
//@RequestMapping("/api/timetable")
@RequestMapping("/user")
public class FileupdownController {
    @Autowired
    private FileupdownRepo fileupdownRepo;

    @PostMapping
    public ResponseEntity<Fileupdown> createNewUser(@RequestParam String name, @RequestPart("file")MultipartFile file) throws IOException {
        Fileupdown user=Fileupdown.builder().userName(name).displayPicture(file.getBytes()).build();
        fileupdownRepo.save(user);
        user.setDisplayPicture(null);
        return  ResponseEntity.ok(user);
    }

    @GetMapping
    public  ResponseEntity<List<Fileupdown>> getAllUser(){
        List<Fileupdown> userList = fileupdownRepo.findAll();
        return  ResponseEntity.ok(userList);

    }


}




//    private static final Logger logger = LoggerFactory.getLogger(FileupdownController.class);
//    @Autowired
//    private FileupdownRepo fileupdownRepo;
//
//
//    @PostMapping("/upload")
//    public ResponseEntity<Fileupdown> uploadFile(@RequestParam("file") MultipartFile file) {
//        String message = "";
//
//        if (ExcelHelper.hasExcelFormat(file)) {
//            try {
//                fileService.save(file);
//
//                message = "Uploaded the file successfully: " + file.getOriginalFilename();
//                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
//            } catch (Exception e) {
//                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
//                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
//            }
//        }
//
//        message = "Please upload an excel file!";
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
//    }
//
//    @GetMapping("/tutorials")
//    public ResponseEntity<List<Tutorial>> getAllTutorials() {
//        try {
//            List<Tutorial> tutorials = fileService.getAllTutorials();
//
//            if (tutorials.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//
//            return new ResponseEntity<>(tutorials, HttpStatus.OK);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @GetMapping("/download")
//    public ResponseEntity<Resource> getFile() {
//        String filename = "tutorials.xlsx";
//        InputStreamResource file = new InputStreamResource(fileService.load());
//
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
//                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
//                .body(file);
//    }
//
//}


//    @Autowired
//    private DocumentRepo documentRepo;
//
//    @Autowired
//    private UserRepo userRepo;
//
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
//    // Get all documents by user ID
//    @GetMapping("/user/{id}")
//    public ResponseEntity<List<Document>> getDocumentsByUserId(@PathVariable Long id) {
//        List<Document> documents = documentRepo.findByUserId(id);
//        return ResponseEntity.ok(documents);
//    }
//
//    // Get Document by ID
//    @GetMapping("/{documentId}")
//    public ResponseEntity<Document> getDocumentById(@PathVariable Long documentId) {
//        Optional<Document> documentOptional = documentRepo.findById(documentId);
//        return documentOptional.map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
//    }
//
//    // Delete Document
//    @DeleteMapping("/{documentId}")
//    public ResponseEntity<String> deleteDocument(@PathVariable Long documentId) {
//        if (!documentRepo.existsById(documentId)) {
//            return ResponseEntity.status(404).body("Document not found.");
//        }
//        documentRepo.deleteById(documentId);
//        return ResponseEntity.ok("Document deleted successfully.");
//    }
//
//    @GetMapping("/list")
//    public ResponseEntity<List<String>> listUploadedFiles() {
//        File folder = new File(uploadDir);
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
