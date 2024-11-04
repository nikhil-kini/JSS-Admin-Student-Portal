package com.example.adminlogin.repository;

import com.example.adminlogin.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepo extends JpaRepository<Document, Long> {
    List<Document> findByUserId(Long userId);

}
