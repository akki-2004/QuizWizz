package com.aks.quizwizz.service;
import com.aks.quizwizz.model.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Questions, Integer> {
    List<Questions> findByCategory(String category);

    @Query(value="SELECT * FROM questions WHERE category=:category ORDER BY RAND() LIMIT :num", nativeQuery = true)
    List<Questions> findRandom5ByCategory(String category, int num);
}