//package com.example.adminlogin.controller;
//
//import com.example.adminlogin.model.LessonPlan;
//import com.example.adminlogin.model.QuestionBank;
//import com.example.adminlogin.repository.LessonPlanRepo;
//import com.example.adminlogin.repository.QuestionBankRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.time.LocalDateTime;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/lp")
//@CrossOrigin(origins = "http://localhost:4200")
//public class LessonPlanController {
//    @Autowired
//    private LessonPlanRepo lessonPlanRepo;
//
//    // Map semester names to specific upload directories
//    private final Map<String, String> semesterDirectories = Map.of(
//            "Sem1", "C:/Users/nithya prashanth/Desktop/images/lessonplan/sem1",
//            "Sem2", "C:/Users/nithya prashanth/Desktop/images/lessonplan/sem2",
//            "Sem3", "C:/Users/nithya prashanth/Desktop/images/lessonplan/sem3",
//            "Sem4", "C:/Users/nithya prashanth/Desktop/images/lessonplan/sem4",
//            "Sem5", "C:/Users/nithya prashanth/Desktop/images/lessonplan/sem5",
//            "Sem6", "C:/Users/nithya prashanth/Desktop/images/lessonplan/sem6"
//    );
//
//    @PostMapping("/upload-lesson-plan")
//    public ResponseEntity<?> uploadQuestionBank(@RequestParam("file") MultipartFile file,
//                                                @RequestParam("semester") String semester) {
//        if (!semesterDirectories.containsKey(semester)) {
//            return ResponseEntity.status(400).body(Map.of("message", "Invalid semester selected."));
//        }
//
//        try {
//            // Get the upload directory for the selected semester
//            String uploadDir = semesterDirectories.get(semester);
//
//            // Create the directory if it doesn't exist
//            Path path = Paths.get(uploadDir);
//            if (!Files.exists(path)) {
//                Files.createDirectories(path);
//            }
//
//            // Save the uploaded file to the specific semester's directory
//            File uploadFile = new File(uploadDir, file.getOriginalFilename());
//            file.transferTo(uploadFile);
//
//            // Save the file metadata to PostgreSQL
//            LessonPlan lessonPlan = new LessonPlan();
//            lessonPlan.setFileName(file.getOriginalFilename());
//            lessonPlan.setFilePath(uploadFile.getAbsolutePath());
//            lessonPlan.setSemester(semester);
//            lessonPlan.setUploadDate(LocalDateTime.now());
//
//            lessonPlanRepo.save(lessonPlan);
//
//            // Return a success message with status 200
//            return ResponseEntity.ok().body(Map.of("message", "File uploaded successfully"));
//        } catch (IOException e) {
//            return ResponseEntity.status(500).body(Map.of("message", "Failed to upload file", "error", e.getMessage()));
//        }
//    }
//}
//
//
//
