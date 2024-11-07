package com.example.adminlogin.repository;

import com.example.adminlogin.model.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimetableRepo extends JpaRepository<Timetable, Long> {
    List<Timetable> findBySemester(int semester);
}
