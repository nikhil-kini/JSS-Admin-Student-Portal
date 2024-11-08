package com.example.adminlogin.repository;

import com.example.adminlogin.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student,Long> {
    Student findByEmailAndPassword(String email,String password);

}
