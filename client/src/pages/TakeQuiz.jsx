import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TakeQuiz = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(null); // Store quiz score
  const [submitted, setSubmitted] = useState(false); // Track if quiz was submitted

  useEffect(() => {
    axios
      .get(`http://localhost:8080/quiz/get/${quizId}`)
      .then((res) => {
        console.log("API Response:", res.data);
        if (Array.isArray(res.data)) {
          setQuestions(res.data);
          const initialAnswers = {};
          res.data.forEach((q) => {
            initialAnswers[q.id] = "";
          });
          setSelectedAnswers(initialAnswers);
        } else {
          setError("Unexpected response format");
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Failed to load quiz.");
      })
      .finally(() => setLoading(false));
  }, [quizId]);

  const handleOptionChange = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    const requestData = {
      ids: Object.keys(selectedAnswers).map((id) => parseInt(id)),
      answers: Object.values(selectedAnswers),
    };

    console.log("Submitting Answers:", requestData);

    axios
      .post("http://localhost:8080/quiz/score", requestData)
      .then((res) => {
        console.log("Score Response:", res.data);
        setScore(res.data);
        setSubmitted(true); // Mark quiz as submitted
      })
      .catch((err) => {
        console.error("Score API Error:", err);
        setError("Failed to submit quiz.");
      });
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Take Quiz</h1>
      {!submitted ? (
        <>
          {questions.map((question) => (
            <div key={question.id}>
              <h3>{question.questionTitle}</h3>
              <div>
                {[question.option1, question.option2, question.option3, question.option4].map((option) => (
                  <label key={option} style={{ display: "block", margin: "5px 0" }}>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={selectedAnswers[question.id] === option}
                      onChange={() => handleOptionChange(question.id, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleSubmit} style={{ marginTop: "20px" }}>Submit Quiz</button>
        </>
      ) : (
        <div>
          <h2>Your Score: {score} / {questions.length}</h2>
          <p>Thank you for taking the quiz!</p>
        </div>
      )}
    </div>
  );
};

export default TakeQuiz;
