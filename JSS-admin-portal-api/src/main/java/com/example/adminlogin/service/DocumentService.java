//package com.example.adminlogin.service;
//
//import com.example.adminlogin.model.User;
//import com.example.adminlogin.model.Document;
//import com.example.adminlogin.repository.UserRepo;
//import com.example.adminlogin.repository.DocumentRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.Date;
//import java.util.List;
//
//@Service
//public class DocumentService {
//
//    @Autowired
//    private DocumentRepo documentRepo;
//
//    @Autowired
//    private UserRepo userRepo; // Inject AdminRepo
//
//    // Method to find an admin by ID
//    public User findByUserId(Long userId) {
//        return userRepo.findById(userId)
//                .orElse(null); // Return null if not found
//    }
//
//    public void uploadDocument(MultipartFile file, String documentType, User user) throws IOException {
//        Document document = new Document();
//        document.setDocumentType(documentType);
//        document.setFileName(file.getOriginalFilename());
//        document.setFileType(file.getContentType());
//        document.setUploadDate(new Date());
//        document.setUser(user); // Set the retrieved Admin object
//        document.setFileData(file.getBytes());
//
//        documentRepo.save(document);
//    }
//
//    public List<Document> getDocumentsByEmployeeId(Long employeeId) {
//        return documentRepo.findByAdminId(employeeId); // Adjust this method according to your mapping
//    }
//
//    public List<Document> getAllDocuments() {
//        return documentRepo.findAll();
//    }
//}