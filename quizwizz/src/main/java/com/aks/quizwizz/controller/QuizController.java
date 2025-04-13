package com.aks.quizwizz.controller;

import java.util.List;

import org.aspectj.weaver.patterns.TypePatternQuestions.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aks.quizwizz.model.QuestionWrapper;
import com.aks.quizwizz.model.Questions;
import com.aks.quizwizz.model.Quiz;
import com.aks.quizwizz.model.ScoreRequest;
import com.aks.quizwizz.service.QuizService;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/quiz")
public class QuizController {
    @Autowired 
    QuizService quizservice;
    // @PostMapping("/create")
    // public ResponseEntity<List<Questions>> createQuestion(@RequestParam String category,@RequestParam int noOfQ){
    //     return quizservice.generateQuetions(category,noOfQ);
    // }
    @PostMapping("/create")
    public ResponseEntity<String> createQuiz(@RequestParam String category,@RequestParam int noOfQ,@RequestParam String title){
        return quizservice.generateQuiz(category,noOfQ,title);
    }
    @GetMapping("/all")
public ResponseEntity<Quiz> getAllQuizzes() {
    return quizservice.getLatestQuiz();
}

    @GetMapping("/get/{id}")
    public ResponseEntity<List<QuestionWrapper>> getQuiz(@PathVariable Integer id){
        return quizservice.getQuiz(id);
    }
   @PostMapping("/score")
public ResponseEntity<Integer> getScore(@RequestBody ScoreRequest request) {
    return quizservice.getScore(request.getIds(), request.getAnswers());
}

}

