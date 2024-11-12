package com.example.adminlogin.repository;

import com.example.adminlogin.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepo extends JpaRepository<Student,Long> {
    Student findByEmailAndPassword(String email,String password);
    List<Student> findBySemester(String semester);
}
