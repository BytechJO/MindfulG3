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

    const correctAnswers = { q1: "0", q2: "0", q3: "0" };
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
              <span>Why was Ellen unhappy in the shop?</span>
              <ul>
                <li>Ellen was bored waiting for her dad.<input type="radio" name="q1" value="0" onChange={handleChange} /></li>
                <li>Ellen spilled water on her jacket.<input type="radio" name="q1" value="1" onChange={handleChange}/></li>
                <li>Ellen forgot her book at home.<input type="radio" name="q1" value="2" onChange={handleChange}/></li>
              </ul>
            </div>

            <div className="Q2">
              <span>What was the look on the shopkeeper’s face <br /> when Ellen hurt his feelings?</span>
              <ul>
                <li>Surprised <input type="radio" name="q2" value="0" onChange={handleChange}/></li>
                <li>Relaxed <input type="radio" name="q2" value="1" onChange={handleChange}/></li>
                <li>Tired <input type="radio" name="q2" value="2" onChange={handleChange}/></li>
              </ul>
            </div>

            <div className="Q3">
              <span>What did Ellen say to the shopkeeper that made her father happy?</span>
              <ul>
                <li>‘I’m sorry, I was rude before.’<input type="radio" name="q3" value="0" onChange={handleChange}/></li>
                <li>‘Your shop is boring!’<input type="radio" name="q3" value="1" onChange={handleChange}/></li>
                <li>‘I like your window display…’<input type="radio" name="q3" value="2" onChange={handleChange}/></li>
              </ul>
            </div>

            <div className="quiz-buttons">
              <button type="button" id="submitBtn1" onClick={handleSubmit}>Submit</button>
              {showSkip && <button type="button" className="skip-btn" onClick={handleSkip}>Skip</button>}
              {showTry && <button type="button" className="try-btn" onClick={handleTryAgain}>Try Again</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
