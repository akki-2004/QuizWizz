package com.aks.quizwizz.doa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.aks.quizwizz.model.Questions;

@Repository
public interface QuestionDOA extends JpaRepository<Questions,Integer>{
    List<Questions> findByCategory(String category);
    @Query(value="SELECT * FROM questions WHERE category=:category ORDER BY RAND() LIMIT :num",nativeQuery=true)
    List<Questions> findRandom5ByCategory( String category,int num);
}
