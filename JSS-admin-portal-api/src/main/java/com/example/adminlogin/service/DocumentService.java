package com.example.adminlogin.service;

import com.example.adminlogin.model.Admin;
import com.example.adminlogin.model.Document;
import com.example.adminlogin.repository.AdminRepo;
import com.example.adminlogin.repository.DocumentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepo documentRepo;

    @Autowired
    private AdminRepo adminRepo; // Inject AdminRepo

    // Method to find an admin by ID
    public Admin findAdminById(Long employeeId) {
        return adminRepo.findById(employeeId)
                .orElse(null); // Return null if not found
    }

    public void uploadDocument(MultipartFile file, String documentType, Admin admin) throws IOException {
        Document document = new Document();
        document.setDocumentType(documentType);
        document.setFileName(file.getOriginalFilename());
        document.setFileType(file.getContentType());
        document.setUploadDate(new Date());
        document.setAdmin(admin); // Set the retrieved Admin object
        document.setFileData(file.getBytes());

        documentRepo.save(document);
    }

    public List<Document> getDocumentsByEmployeeId(Long employeeId) {
        return documentRepo.findByAdminId(employeeId); // Adjust this method according to your mapping
    }

    public List<Document> getAllDocuments() {
        return documentRepo.findAll();
    }
}