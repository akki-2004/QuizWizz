package com.aks.quizwizz.model;

import java.util.List;

public class ScoreRequest {

        private List<Integer> ids;
        private List<String> answers;
        public List<Integer> getIds() { return ids; }
        public void setIds(List<Integer> ids) { this.ids = ids; }
        public List<String> getAnswers() { return answers; }
        public void setAnswers(List<String> answers) { this.answers = answers; }
    
    
}
