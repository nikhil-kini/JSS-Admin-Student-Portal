package com.example.adminlogin.controller;

import com.example.adminlogin.model.Feedback;
import com.example.adminlogin.repository.FeedbackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "http://localhost:4200")

public class FeedbackController {
//    @Autowired
//    private FeedbackRepo feedbackRepo;
//
//    @GetMapping("/all")
//    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
//        List<Feedback> feedbacks = feedbackRepo.findAll();
//        return new ResponseEntity<>(feedbacks, HttpStatus.OK);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
//        Feedback feedback = feedbackRepo.findById(id).orElse(null);
//        return feedback != null ? new ResponseEntity<>(feedback, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }
//
//    @PostMapping("/addFeedback")
//    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {
//        feedback.setCreatedAt(LocalDateTime.now());
//        Feedback createdFeedback = feedbackRepo.save(feedback);
//        return new ResponseEntity<>(createdFeedback, HttpStatus.CREATED);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Feedback> updateFeedback(@PathVariable Long id, @RequestBody Feedback feedback) {
//        Feedback existingFeedback = feedbackRepo.findById(id).orElse(null);
//        if (existingFeedback != null) {
//            feedback.setFeedbackId(id);
//            feedback.setCreatedAt(existingFeedback.getCreatedAt());
//            Feedback updatedFeedback = feedbackRepo.save(feedback);
//            return new ResponseEntity<>(updatedFeedback, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
//        if (feedbackRepo.existsById(id)) {
//            feedbackRepo.deleteById(id);
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//}

    @Autowired
    private FeedbackRepo feedbackRepo;

    @PostMapping("/addQuestion")
    public ResponseEntity<Feedback> createQuestion(@RequestBody Feedback feedback) {
        feedback.setCreatedAt(LocalDateTime.now());
        feedback.setType("Question");  // Mark as a question
        feedback.setAnswer(null);       // No answer for questions
        Feedback createdFeedback = feedbackRepo.save(feedback);  // Save feedback to the database
        return new ResponseEntity<>(createdFeedback, HttpStatus.CREATED);
    }

    // Fetch all questions for displaying (Admin)
    @GetMapping("/questions")
    public ResponseEntity<List<String>> getFeedbackQuestions() {
        List<Feedback> feedbacks = feedbackRepo.findByType("Question");
        List<String> questions = feedbacks.stream()
                .map(Feedback::getQuestion)
                .collect(Collectors.toList());
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    // Submit a response to a feedback question (Student)
    @PostMapping("/submitResponse")
    public ResponseEntity<Feedback> submitResponse(@RequestBody Feedback response) {
        try {
            // Assuming response is tied to a question by question ID (feedbackId)
            Feedback question = feedbackRepo.findById(response.getFeedbackId())
                    .orElseThrow(() -> new RuntimeException("Question not found"));

            response.setCreatedAt(LocalDateTime.now());
            response.setType("Response");  // Mark as a response
            response.setQuestion(question.getQuestion());  // Set the question text
            Feedback savedResponse = feedbackRepo.save(response);

            return new ResponseEntity<>(savedResponse, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Fetch all responses (Admin)
    @GetMapping("/submitResponse")
    public ResponseEntity<List<Feedback>> getFeedbackResponses() {
        List<Feedback> responses = feedbackRepo.findByType("Response");
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
}