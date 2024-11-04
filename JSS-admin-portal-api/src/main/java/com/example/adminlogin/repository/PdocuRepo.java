package com.example.adminlogin.repository;

import com.example.adminlogin.model.Document;
import com.example.adminlogin.model.Pdocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PdocuRepo extends JpaRepository<Pdocument,Long> {
//    List<Pdocument> findByUserId(Long userId);
}
