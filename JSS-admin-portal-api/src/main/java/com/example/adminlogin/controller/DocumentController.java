package com.example.adminlogin.controller;

import com.example.adminlogin.model.Admin;
import com.example.adminlogin.model.Document;
import com.example.adminlogin.repository.DocumentRepo;
import com.example.adminlogin.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/documents")
@CrossOrigin

public class DocumentController {
    @Autowired
    private DocumentService documentService;

    @Autowired
    private DocumentRepo documentRepo;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("documentType") String documentType,
            @RequestParam("employeeId") Long employeeId) {

        System.out.println("file = " + file.getOriginalFilename()); // Log filename
        try {
            // Retrieve the actual employee (admin) from your service or repository
            Admin admin = documentService.findAdminById(employeeId);
            if (admin == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found");
            }

            documentService.uploadDocument(file, documentType, admin); // Pass the actual admin object
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocument(@PathVariable Long id) {
        return documentRepo.findById(id)
                .map(document -> ResponseEntity.ok().body(document))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/file/{id}")
    public ResponseEntity<byte[]> getFileOnly(@PathVariable Long id) {
        return documentRepo.findById(id)
                .map(document -> ResponseEntity.ok().body(document.getFileData()))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/all")
    public ResponseEntity<List<Document>> getAllDocuments() {
        List<Document> documents = documentService.getAllDocuments();
        return ResponseEntity.ok(documents);
    }

    @GetMapping("/files/{employeeId}")
    public ResponseEntity<List<Document>> getDocumentsByEmployeeId(@PathVariable Long employeeId) {
        List<Document> documents = documentService.getDocumentsByEmployeeId(employeeId);
        if (documents.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(documents);
        }
        return ResponseEntity.ok(documents);
    }
}