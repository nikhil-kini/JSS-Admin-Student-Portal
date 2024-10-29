package com.example.adminlogin.controller;

import com.example.adminlogin.model.Timetable;
import com.example.adminlogin.repository.TimetableRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.ss.usermodel.*; // For Workbook, Sheet, Row, etc.
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/timetable")
public class TimetableController {
    @Autowired
    private TimetableRepo timetableRepo;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadTimetable(@RequestParam("file") MultipartFile file) {
        List<Timetable> timetableList = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // Skip header row
                Timetable timetable = new Timetable();
                timetable.setSubject(row.getCell(0).getStringCellValue());
                timetable.setDayOfWeek(row.getCell(1).getStringCellValue());
                timetable.setStartTime(row.getCell(2).getStringCellValue());
                timetable.setEndTime(row.getCell(3).getStringCellValue());
                timetableList.add(timetable);
            }

            timetableRepo.saveAll(timetableList);
            return new ResponseEntity<>("File uploaded successfully!", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Failed to upload file: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

