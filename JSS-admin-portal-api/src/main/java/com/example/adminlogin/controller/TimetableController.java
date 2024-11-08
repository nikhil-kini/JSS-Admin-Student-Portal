package com.example.adminlogin.controller;

import com.example.adminlogin.model.Timetable;
import com.example.adminlogin.repository.TimetableRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
//@RequestMapping("/api/timetables")
@RequestMapping("/uploadExcel")
public class TimetableController {

}

//    @Autowired
//    private TimetableRepo timetableRepo;

//    @PostMapping
//    public ResponseEntity<String> handleFileUpload(@RequestParam("file") ){
//
//    }
////
//}
//    @PostMapping("/upload-timetable")
//    public ResponseEntity<?> uploadTimetable(@RequestParam("file") MultipartFile file) {
//        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
//            Sheet sheet = workbook.getSheetAt(0);
//            List<Timetable> timetables = new ArrayList<>();
//
//            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
//                Row row = sheet.getRow(i);
//                if (row != null) {
//                    // Check if required fields are present
//                    Timetable timetable = new Timetable();
//                    timetable.setSemester((int) row.getCell(0).getNumericCellValue());
//                    timetable.setDay(row.getCell(1).getStringCellValue());
//                    timetable.setTimeSlot(row.getCell(2).getStringCellValue());
//                    timetable.setSubject(row.getCell(3).getStringCellValue());
//
//                    timetables.add(timetable);
//                }
//            }
//
//            timetableRepo.saveAll(timetables);
//            return ResponseEntity.ok().body("File uploaded successfully");
//        } catch (IOException e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Error processing file"));
//        }
//    }
//

//    @GetMapping
//    public ResponseEntity<List<Timetable>> getAllTimetables() {
//        List<Timetable> timetables = timetableRepo.findAll();
//        return ResponseEntity.ok().body(timetables);
//    }
