import React, { useState } from 'react';
import axios from 'axios';

const CreateQuiz = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/quiz/create', null, {
        params: { category, noOfQ: numQuestions, title }
      })
      .then(res => alert(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Create Quiz</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
        <input type="number" placeholder="No. of Questions" value={numQuestions} onChange={e => setNumQuestions(e.target.value)} required />
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default CreateQuiz;