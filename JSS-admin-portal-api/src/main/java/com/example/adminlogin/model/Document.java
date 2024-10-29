package com.example.adminlogin.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(name = "documents")
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long docId;

    @Column(name = "document_type")
    private String documentType;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_type")
    private String fileType;

    @Temporal(TemporalType.TIMESTAMP)
    private Date uploadDate;

    @Lob
    private byte[] fileData;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long docId;
//
//    private String documentType;
//    private byte[] fileData; // if you're saving the file data as a blob
//    private String fileName;
//    private String fileType;
//    private LocalDateTime uploadDate;
//
//    @Column(nullable = false)
//    private Long Id;
}