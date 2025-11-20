import Q1Image from './assets/Q1.png';
import React, { useState } from 'react';
import '../../shared/Quiz.css';
import { useParams, useNavigate } from 'react-router-dom';
import '../../shared/StoryPage.css';
import ValidationAlert from '../../shared/ValidationAlert';

export const QuizPage = () => {
  const { unitId, lessonId } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!answers.q1 || !answers.q2 || !answers.q3) {
      ValidationAlert.info("Incomplete", "Please answer all questions before submitting!");
      return;
    }
    const correctAnswers = { q1: "0", q2: "0", q3: "0" };
    const results = {
      q1: answers.q1 === correctAnswers.q1,
      q2: answers.q2 === correctAnswers.q2,
      q3: answers.q3 === correctAnswers.q3
    };
    const score = Object.values(results).filter(isCorrect => isCorrect).length;
    const totalQuestions = Object.keys(results).length;
    const scoreString = `${score}/${totalQuestions}`;
    const resultsHtml = `
      Q1: ${results.q1 ? '✅ Correct' : '❌ Wrong'}  <br>

      Q2: ${results.q2 ? '✅ Correct' : '❌ Wrong'}  <br>

      Q3: ${results.q3 ? '✅ Correct' : '❌ Wrong'}<br>
      <hr>
      <p><strong>Score:</strong> ${score}/${totalQuestions}</p>
    `;
    if (score === totalQuestions) {
      ValidationAlert.success("Good Job!", "", scoreString)
        .then(() => {
          navigate(`/unit/${unitId}/lesson/${lessonId}/feedBack`);
        });
    } else {
      ValidationAlert.error("Try again", "", scoreString)  
    }
  };

  return (
    <div className="story-pages-container">
      <div className="w-full max-w-6xl">
        <div className="paper animate__animated animate__backInDown" id="p3">
          <img src={Q1Image} alt="Background" className="bg-img" />

          <div className="content">
            <div className="Q1">
              <span>How did David and Milo stay good friends even with
                their differences?</span>
              <ul>
                <li>They worked together. <input type="radio" name="q1" value="0" onChange={handleChange} /></li>
                <li>They argued with each other. <input type="radio" name="q1" value="1" onChange={handleChange} /></li>
                <li>They ignored each other.<input type="radio" name="q1" value="2" onChange={handleChange} /></li>
              </ul>
            </div>

            <div className="Q2">
              <span>What was the problem between David and Milo?</span>
              <ul>
                <li>They couldn’t decide which game to play first.<input type="radio" name="q2" value="0" onChange={handleChange} /></li>
                <li>They played rock, paper, scissors.<input type="radio" name="q2" value="1" onChange={handleChange} /></li>
                <li>They yelled at each other.<input type="radio" name="q2" value="2" onChange={handleChange} /></li>
              </ul>
            </div>

            <div className="Q3" >
              <span>How did David and Milo solve their problem?</span>
              <ul>
                <li>They played rock, paper, scissors.<input type="radio" name="q3" value="0" onChange={handleChange} /></li>
                <li>They did not play any games.<input type="radio" name="q3" value="1" onChange={handleChange} /></li>
                <li>They went and told their parents.<input type="radio" name="q3" value="2" onChange={handleChange} /></li>
              </ul>
            </div>

            <button type="button" id="submitBtn" onClick={handleSubmit}>Submit</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default QuizPage;
