package com.example.adminlogin.repository;

import com.example.adminlogin.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepo extends JpaRepository<Feedback,Long> {
    List<Feedback> findByType(String type);
}
