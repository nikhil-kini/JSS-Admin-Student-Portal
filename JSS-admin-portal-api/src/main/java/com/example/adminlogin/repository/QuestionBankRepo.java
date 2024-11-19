package com.example.adminlogin.repository;

import com.example.adminlogin.model.QuestionBank;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionBankRepo extends JpaRepository<QuestionBank,Long> {
}
