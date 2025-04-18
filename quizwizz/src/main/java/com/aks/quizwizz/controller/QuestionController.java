package com.aks.quizwizz.controller;

import com.aks.quizwizz.model.Questions;
import com.aks.quizwizz.DTO.ApiResponse;
import com.aks.quizwizz.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    QuestionService qService;

    @GetMapping("allQuestions")
    public ResponseEntity<List<Questions>> getAllQuestions() {
        return qService.getAllQuestions();
    }

    @GetMapping("category/{category}")
    public ResponseEntity<List<Questions>> getQuestionsByCategory(@PathVariable String category) {
        return qService.getQuestionsByCategory(category);
    }

    @PostMapping("addQuestion")
    public ResponseEntity<ApiResponse> postQuestions(@RequestBody Questions question) {
        return qService.addQuestion(question);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<ApiResponse> UpdateQuestion(@PathVariable Integer id, @RequestBody Questions question) {
        return qService.updateQuestion(id, question);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<ApiResponse> deleteQuestion(@PathVariable Integer id) {
        return qService.deleteQuestion(id);
    }
}
