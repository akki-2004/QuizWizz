package com.aks.quizwizz.doa;

import java.util.List;

import org.aspectj.weaver.patterns.TypePatternQuestions.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import com.aks.quizwizz.model.Questions;
import com.aks.quizwizz.model.Quiz;

public interface QuizDOA extends JpaRepository<Quiz,Integer> {

    
}
