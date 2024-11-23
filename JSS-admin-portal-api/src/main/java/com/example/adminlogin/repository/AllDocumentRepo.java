package com.example.adminlogin.repository;

import com.example.adminlogin.model.AllDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AllDocumentRepo extends JpaRepository<AllDocument,Long> {
    List<AllDocument> findByUserId(Long userId);
    List<AllDocument> findByDocumentCategory(String documentCategory);
    List<AllDocument> findBySemesterAndDocumentCategory(String semester, String documentCategory);

}
