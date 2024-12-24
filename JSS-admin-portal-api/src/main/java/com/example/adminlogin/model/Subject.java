package com.example.adminlogin.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "subjects")
@Data
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String semester;
    private String subject;
    private String subjectCode;

    private String fileName;
    private String filePath;
    private String fileType;
    private LocalDateTime uploadedDate;

    private Long userId;
//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = true)
//    private User user;
}
