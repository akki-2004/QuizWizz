package com.aks.quizwizz.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.aks.quizwizz.doa.QuestionDOA;
import com.aks.quizwizz.model.Questions;

@Service
public class QuestionService {
@Autowired
QuestionDOA doaa;
    public ResponseEntity<List<Questions>> getAllQuestions(){
        try {
            
            return new ResponseEntity<>(doaa.findAll(),HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
        
    }

    
    public ResponseEntity<List<Questions>> getQuestionsByCategory(String category){
        // return ;
        try {
            
            return new ResponseEntity<>(doaa.findByCategory(category),HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.BAD_REQUEST);
        
    }

    public ResponseEntity<String> addQuestion(Questions question){
         
         try {
            doaa.save(question);
            return new ResponseEntity<>("success",HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>("failure",HttpStatus.BAD_REQUEST);
        
        //  return "Success";
    }
    public ResponseEntity<String> deleteQuestion(Integer id) {
        if (doaa.existsById(id)) {
            doaa.deleteById(id);
            return ResponseEntity.ok("Question deleted successfully!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question not found!");
    }
    
    public ResponseEntity<String> updateQuestion(Integer id, Questions question) {
        if (doaa.existsById(id)) {
            question.setId(id);  // Ensure ID remains the same
            doaa.save(question);
            return ResponseEntity.ok("Question updated successfully!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Question not found!");
    }
    
}
