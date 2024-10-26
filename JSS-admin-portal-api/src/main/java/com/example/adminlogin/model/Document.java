//package com.example.adminlogin.model;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import lombok.ToString;
//
//import java.util.Date;
//
//@Entity
//@Table(name = "documents")
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//@ToString
//
//public class Document {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @Column(nullable = false)
//    private String documentType;
//
//    @Column(nullable = false)
//    private String fileName;
//
//    @Column(nullable = false)
//    private String fileType; // e.g., application/pdf, image/jpeg
//
//    @Temporal(TemporalType.TIMESTAMP)
//    @Column(nullable = false)
//    private Date uploadDate;
//
//    @Lob
//    @Column(name = "file_data")
//    private byte[] fileData;
//
//    @ManyToOne
//    @JoinColumn(name = "id", nullable = false)
//    private User user; // Assuming class name `Employee` should start with an uppercase letter
//}
//
//
