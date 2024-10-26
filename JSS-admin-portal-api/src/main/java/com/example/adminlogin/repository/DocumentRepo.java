package com.example.adminlogin.repository;

import com.example.adminlogin.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface DocumentRepo extends JpaRepository<Document,Long> {
    List<Document> findByAdminId(Long adminId);
}
