package com.aks.quizwizz.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aks.quizwizz.model.Questions;
import com.aks.quizwizz.service.QuestionService;import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/question")
public class QuestionController {
    @Autowired
    QuestionService qService;

    @GetMapping("allQuestions")
    public ResponseEntity<List<Questions>> getAllQuestions(){
        return qService.getAllQuestions();
    }


    @GetMapping("category/{category}")
    //if "category/{cat} , then @PathVariable("cat")"
    public ResponseEntity<List<Questions>> getQuestionsByCategory(@PathVariable String category){
        return qService.getQuestionsByCategory(category);
    }
    @PostMapping("addQuestion")
    //we send json body and spring directly converts it into Object
    public ResponseEntity<String> postQuestions(@RequestBody Questions question){
        return qService.addQuestion(question);
        // return s;
    }
    @PutMapping("update/{id}")
    public ResponseEntity<String> UpdateQuestion(@PathVariable Integer id,@RequestBody Questions question){
        return qService.updateQuestion(id,question);
        // return s;
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Integer id){
        return qService.deleteQuestion(id);
        // return s;
    }
}
