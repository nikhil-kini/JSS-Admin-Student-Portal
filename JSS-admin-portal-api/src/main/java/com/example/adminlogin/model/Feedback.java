package com.example.adminlogin.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "Feedback")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_ID")
    private Long feedbackId;

    @Column(name = "Question")
    private String question;

    @Column(name = "Answer")
    private String answer;

    @Column(name = "AddedBy")
    private String addedBy;

    @Column(name = "Username")
    private String username;

    @CreationTimestamp
    @Column(name = "Created_at",updatable = false)
    private LocalDateTime createdAt;

}
