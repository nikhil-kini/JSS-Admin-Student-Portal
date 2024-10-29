package com.example.adminlogin.repository;

import com.example.adminlogin.model.Timetable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimetableRepo extends JpaRepository<Timetable, Long> {
}
