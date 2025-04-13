package com.aks.quizwizz.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.aks.quizwizz.doa.QuestionDOA;
import com.aks.quizwizz.doa.QuizDOA;
import com.aks.quizwizz.model.QuestionWrapper;
import com.aks.quizwizz.model.Questions;
import com.aks.quizwizz.model.Quiz;

@Service
public class QuizService {

    @Autowired 
    private QuestionDOA questionDOA;

    @Autowired 
    private QuizDOA quizDOA;

    public ResponseEntity<String> generateQuiz(String category, int no, String title) {
        List<Questions> questions = questionDOA.findRandom5ByCategory(category, no);
        
        if (questions == null || questions.isEmpty()) {
            return new ResponseEntity<>("No questions found for the given category.", HttpStatus.NOT_FOUND);
        }
        
        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestions(questions);
        quizDOA.save(quiz);

        return new ResponseEntity<>("Quiz created successfully", HttpStatus.OK);
    }
    public ResponseEntity<Quiz> getLatestQuiz() {
        List<Quiz> quizzes = quizDOA.findAll();
        
        if (quizzes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    
        Quiz latestQuiz = quizzes.get(quizzes.size() - 1); // Get the last uploaded quiz
        return new ResponseEntity<>(latestQuiz, HttpStatus.OK);
    }
    
    public ResponseEntity<List<QuestionWrapper>> getQuiz(Integer id) {
        Optional<Quiz> obj = quizDOA.findById(id);
        
        if (obj.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Questions> qfd = obj.get().getQuestions();
        List<QuestionWrapper> qfu = new ArrayList<>();

        for (Questions question : qfd) {
            QuestionWrapper questionWrapper = new QuestionWrapper(
                question.getId(),
                question.getQuestionTitle(),
                question.getOption1(),
                question.getOption2(),
                question.getOption3(),
                question.getOption4()
            );
            qfu.add(questionWrapper);
        }

        return new ResponseEntity<>(qfu, HttpStatus.OK);
    }

    public ResponseEntity<Integer> getScore(List<Integer> ids, List<String> answers) {
        int score = 0;
    
        for (int i = 0; i < ids.size(); i++) {
            Integer questionId = ids.get(i);
            String userAnswer = answers.get(i);
    
            if (questionDOA.existsById(questionId)) {
                Questions q = questionDOA.findById(questionId).orElse(null);
                
                if (q != null && q.getAnswer().equals(userAnswer)) {
                    score++;
                }
            }
        }
    
        return new ResponseEntity<>(score,HttpStatus.OK);
    }
    
}
