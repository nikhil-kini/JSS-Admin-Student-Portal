package com.example.adminlogin.repository;

import com.example.adminlogin.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepo extends JpaRepository<Subject,Long> {
    List<Subject> findBySemester(String semester);
}
