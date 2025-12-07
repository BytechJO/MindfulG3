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
  const [showSkip, setShowSkip] = useState(false);
  const [showTry, setShowTry] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!answers.q1 || !answers.q2 || !answers.q3) {
      ValidationAlert.info("Incomplete", "Please answer all questions before submitting!");
      return;
    }

    const correctAnswers = { q1: "1", q2: "2", q3: "1" };
    const results = {
      q1: answers.q1 === correctAnswers.q1,
      q2: answers.q2 === correctAnswers.q2,
      q3: answers.q3 === correctAnswers.q3
    };

    const score = Object.values(results).filter(Boolean).length;
    const totalQuestions = Object.keys(results).length;
    const scoreString = `${score}/${totalQuestions}`;

    setShowSkip(true);
    setShowTry(true);

    if (score === totalQuestions) {
      ValidationAlert.success("Good Job!", "", scoreString)
        .then(() => navigate(`/unit/${unitId}/lesson/${lessonId}/feedBack`));
    } else {
      ValidationAlert.error("Try again", "", scoreString);
    }
  };

  const handleTryAgain = () => {
    setAnswers({ q1: null, q2: null, q3: null });
    setShowSkip(false);
    setShowTry(false);

    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => (radio.checked = false));
  };

  const handleSkip = () => {
    navigate(`/unit/${unitId}/lesson/${lessonId}/feedBack`);
  };

  return (
    <div className="story-pages-container">
      <div className="w-full max-w-6xl">
        <div className="paper animate__animated animate__backInDown" id="p3">
          <img src={Q1Image} alt="Background" className="bg-img" />

          <div className="content">
            <div className="Q1">
              <span>How did Liz and Ryan help their parents?</span>
              <ul>
                <li>They asked them what to do. <input type="radio" name="q1" value="0" onChange={handleChange} /></li>
                <li>They wrote a list of chores and did them.<input type="radio" name="q1" value="1" onChange={handleChange}/></li>
                <li>They cooked the food. <input type="radio" name="q1" value="2" onChange={handleChange}/></li>
              </ul>
            </div>
            
            <div className="Q2">
              <span>At the beginning of the story Liz and Ryan were watching TV <br />while Mum and Dad cooked.</span>
              <br />
              <span>Liz didn’t think that was _________.</span>
              <ul>
                <li>Caring <input type="radio" name="q2" value="0" onChange={handleChange}/></li>
                <li>Nice<input type="radio" name="q2" value="1" onChange={handleChange}/></li>
                <li>Fair <input type="radio" name="q2" value="2" onChange={handleChange}/></li>
              </ul>
            </div>
            
            <div className="Q3" >
              <span>How did Mum and Dad feel at the end of the story?</span>
              <ul>
                <li>Tired <input type="radio" name="q3" value="0" onChange={handleChange}/></li>
                <li>Relaxed <input type="radio" name="q3" value="1" onChange={handleChange}/></li>
                <li>Angry <input type="radio" name="q3" value="2" onChange={handleChange}/></li>
              </ul>
            </div>

            <div className="quiz-buttons">
              <button type="button" id="submitBtn" onClick={handleSubmit}>Submit</button>

              {showSkip && (
                <button type="button" className="skip-btn" onClick={handleSkip}>Skip</button>
              )}

              {showTry && (
                <button type="button" className="try-btn" onClick={handleTryAgain}>Try Again</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
