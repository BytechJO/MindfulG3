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
  const [results, setResults] = useState({ q1: null, q2: null, q3: null });
  const [showSkip, setShowSkip] = useState(false);
  const [showTry, setShowTry] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleTryAgain = () => {
    setAnswers({ q1: null, q2: null, q3: null });
    setResults({ q1: null, q2: null, q3: null });
    setShowSkip(false);
    setShowTry(false);

    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach(radio => (radio.checked = false));
  };

  const handleSubmit = () => {
    if (!answers.q1 || !answers.q2 || !answers.q3) {
      ValidationAlert.info("Incomplete", "Please answer all questions before submitting!");
      return;
    }

    const correctAnswers = { q1: "0", q2: "0", q3: "0" };

    const newResults = {
      q1: answers.q1 === correctAnswers.q1,
      q2: answers.q2 === correctAnswers.q2,
      q3: answers.q3 === correctAnswers.q3
    };

    setResults(newResults);
    setShowSkip(true);
    setShowTry(true);

    const score = Object.values(newResults).filter(Boolean).length;
    const totalQuestions = Object.keys(newResults).length;
    const scoreString = `${score}/${totalQuestions}`;

    if (score === totalQuestions) {
      ValidationAlert.success("Good Job!", "", scoreString)
        .then(() => navigate(`/unit/${unitId}/lesson/${lessonId}/feedBack`));
    } else {
      ValidationAlert.error("Try again", "", scoreString);
    }
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
            {/* Q1 */}
            <div className="Q1">
              <span>Why did Rose need the teacher’s help?</span>
              <ul>
                <li>To help Peter from being bullied.
                  <input type="radio" name="q1" value="0" onChange={handleChange} />
                </li>
                <li>To help her with spelling on the test.
                  <input type="radio" name="q1" value="1" onChange={handleChange}/>
                </li>
                <li>To help Peter with his spelling test.
                  <input type="radio" name="q1" value="2" onChange={handleChange}/>
                </li>
              </ul>
            </div>

            {/* Q2 */}
            <div className="Q2">
              <span>Why was Rose scared to tell the teacher?</span>
              <ul>
                <li>She was scared of being a telltale.
                  <input type="radio" name="q2" value="0" onChange={handleChange}/>
                </li>
                <li>She was scared of the spelling test.
                  <input type="radio" name="q2" value="1" onChange={handleChange}/>
                </li>
                <li>She was scared about not going outside.
                  <input type="radio" name="q2" value="2" onChange={handleChange}/>
                </li>
              </ul>
            </div>

            {/* Q3 */}
            <div className="Q3">
              <span>What happened at the end of the story?</span>
              <ul>
                <li>Josh and Anya apologised to Peter.
                  <input type="radio" name="q3" value="0" onChange={handleChange}/>
                </li>
                <li>Josh and Anya continued to bully Peter.
                  <input type="radio" name="q3" value="1" onChange={handleChange}/>
                </li>
                <li>Josh and Anya ignored Peter.
                  <input type="radio" name="q3" value="2" onChange={handleChange}/>
                </li>
              </ul>
            </div>

            {/* Buttons */}
            {showSkip && (
              <button type="button" className="skip-btn" onClick={handleSkip}>
                Skip
              </button>
            )}

            {showTry && (
              <button className="try-btn" onClick={handleTryAgain}>
                Try again
              </button>
            )}

            <button type="button" id="submitBtn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
