// package com.aks.quizwizz.model;

package com.aks.quizwizz.model;

// package com.aks.quizwizz.model;

import jakarta.persistence.*;

import lombok.Data;

@Data
@Entity
@Table(name = "questions") // Ensure correct table mapping
public class Questions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String category;
    private String difficulty;

    // @Column(name = "questionTitle", nullable = false) // Ensure correct column name
    private String questionTitle;

    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String answer;
}
