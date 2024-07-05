import React, { useState, useEffect } from "react";
import "./index.css"; // Create a CSS file for styling
import img1 from "./assets/Char_minar.jpg";
import img2 from "./assets/Golden_temple.jpg";
import img3 from "./assets/Hawa_mahal.jpg";
import img4 from "./assets/Ram_mandir.jpg";
import img5 from "./assets/Red_fort.jpg";

const questions = [
  {
    q: "2+2",
    opt: [1, 2, 3, 4],
    correct: 4,
    hasImage: false,
    AreOptionsImage: false,
  },
  {
    q: "2*2*2-8",
    opt: [8, 0, -2, 1],
    correct: 0,
    hasImage: false,
    AreOptionsImage: false,
  },
  {
    q: "3+3+3",
    opt: [0, 333, 6, 9],
    correct: 9,
    hasImage: false,
    AreOptionsImage: false,
  },
  {
    q: "4*4/4",
    opt: [4, 0, 8, 16],
    correct: 4,
    hasImage: false,
    AreOptionsImage: false,
  },
  {
    q: `<img class="photo" src=${img4} /> Which monument is this?`,
    opt: ["Taj Mahal", "Red Fort", "Qutub Minar", "Ram Mandir"],
    correct: "Ram Mandir",
    hasImage: true,
    AreOptionsImage: false,
  },
  {
    q: "Which of the following is in Punjab?",
    opt: [
      `<img class="photo" src=${img1} />`,
      `<img class="photo" src=${img2} />`,
      `<img class="photo" src=${img3} />`,
      `<img class="photo" src=${img5} />`,
    ],
    correct: `<img class="photo" src=${img2} />`,
    hasImage: true,
    AreOptionsImage: true,
  },
];

const Quiz = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const shuffled = questions.sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !quizFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      if (selectedOption === shuffledQuestions[currentQuestionIndex].correct) {
        setScore(score + 1);
      }
      handleNextQuestion();
    }
  }, [timeLeft, quizFinished, selectedOption]);

  const handleOptionClick = (option) => {
    if (selectedOption === null) {
      setSelectedOption(option);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setTimeLeft(5);
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  if (quizFinished) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="quiz-container h-[80vh]">
          <h1 className="text-5xl mb-5">Quiz App</h1>
          <h2>Your score is: {score}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="quiz-container h-[80vh]">
        <h1 className="text-5xl mb-5">Quiz App</h1>
        <div className="tracker">
          {shuffledQuestions.map((q, index) => (
            <span
              key={index}
              className={`tracker-item ${
                index === currentQuestionIndex ? "active" : ""
              }`}
            >
              {index + 1}
            </span>
          ))}
        </div>
        <div className="timer">Time left: {timeLeft} seconds</div>
        <div className="question w-full">
          {currentQuestion.hasImage ? (
            <div
              className="w-full h-full flex justify-center items-center flex-col"
              dangerouslySetInnerHTML={{ __html: currentQuestion.q }}
            />
          ) : (
            <h1 className="text-center">{currentQuestion.q}?</h1>
          )}
        </div>
        <div className="options flex flex-wrap justify-center shrink-0 w-[50%]">
          {currentQuestion.opt.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={selectedOption === option ? "selected" : ""}
              dangerouslySetInnerHTML={{ __html: option }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
