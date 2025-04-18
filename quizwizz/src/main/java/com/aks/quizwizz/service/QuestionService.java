package com.aks.quizwizz.service;

import com.aks.quizwizz.DTO.ApiResponse;
import com.aks.quizwizz.model.Questions;
import com.aks.quizwizz.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {
    @Autowired
    QuestionRepository repository;

    public ResponseEntity<List<Questions>> getAllQuestions() {
        try {
            return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<Questions>> getQuestionsByCategory(String category) {
        try {
            return new ResponseEntity<>(repository.findByCategory(category), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<ApiResponse> addQuestion(Questions question) {
        try {
            repository.save(question);
            return new ResponseEntity<>(new ApiResponse("Question added", true), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse("Failed to add question", false), HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<ApiResponse> deleteQuestion(Integer id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.ok(new ApiResponse("Question deleted successfully!", true));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Question not found!", false));
    }

    public ResponseEntity<ApiResponse> updateQuestion(Integer id, Questions question) {
        if (repository.existsById(id)) {
            question.setId(id);
            repository.save(question);
            return ResponseEntity.ok(new ApiResponse("Question updated successfully!", true));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Question not found!", false));
    }
}