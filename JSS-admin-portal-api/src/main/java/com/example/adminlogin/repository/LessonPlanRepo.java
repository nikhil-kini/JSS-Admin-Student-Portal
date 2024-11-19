package com.example.adminlogin.repository;

import com.example.adminlogin.model.LessonPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LessonPlanRepo extends JpaRepository<LessonPlan,Long> {
}
