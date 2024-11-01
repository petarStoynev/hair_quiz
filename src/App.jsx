import { useState } from "react";
import { QuizData } from "./Components/Question/QuizData";
import Question from "./Components/Question/Question";
import Result from "./Components/Result/Result";
import CircularProgress from "@mui/joy/CircularProgress";

const MIN_ACTIVE_QUESTION_INDEX = 0;
const MAX_ACTIVE_QUESTION_INDEX = 4;
const DIRECTION_PREV = -1;
const DIRECTION_NEXT = 1;

const limitWithinBoundaries = (val, min, max) =>
  Math.max(min, Math.min(val, max));

const replaceAnswerImmutable = (index, answer, answers) => {
  const result = [...answers];
  result[index] = answer;
  return result;
};

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(
    MIN_ACTIVE_QUESTION_INDEX
  );
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [barValue, setBarValue] = useState(0);

  const onNavigationButtonClick = (direction) => {
    setSelectedQuestionIndex((currentSelectedQuestionIndex) =>
      limitWithinBoundaries(
        currentSelectedQuestionIndex + direction,
        MIN_ACTIVE_QUESTION_INDEX,
        MAX_ACTIVE_QUESTION_INDEX
      )
    );
  };

  const onAnswerClick = (event) => {
    const answer = event.target.dataset.answer;

    if (!answer) return;

    setAnswers((currentAnswers) =>
      replaceAnswerImmutable(selectedQuestionIndex, answer, currentAnswers)
    );
  };

  const selectedQuestion = QuizData[selectedQuestionIndex];
  const selectedAnswer = answers[selectedQuestionIndex];

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleBackButton = (e) => {
    if (selectedQuestionIndex == 0) {
      setBarValue(0);
    } else {
      setBarValue((barValue) => barValue - 25);
    }

    onNavigationButtonClick(DIRECTION_PREV);
  };

  const handleNextButton = (e) => {
    e.preventDefault();

    if (selectedQuestionIndex == 4) {
      setShowResult(true);
    } else {
      onNavigationButtonClick(DIRECTION_NEXT);
    }

    setBarValue((barValue) => barValue + 25);
  };

  return (
    <div className="App">
      {showResult ? (
        <Result
        answers={answers} />
      ) : isStarted ? (
        <div className="main-wrapper">
          <div className="question-wrapper">
            <Question

              data={selectedQuestion}
              onAnswerClick={onAnswerClick}
              selectedAnswer={selectedAnswer}
            />

            <div className="buttons-container">
              <button className="back" onClick={handleBackButton}>
                Back
              </button>
              <button className="next" onClick={handleNextButton}>
                Next Question<i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <div className="progress-bar">
            <CircularProgress
              sx={{ "--CircularProgress-size": "80px" }}
              determinate
              value={barValue}
            >
              {selectedQuestionIndex + 1} / 5
            </CircularProgress>
          </div>
        </div>
      ) : (
        <div className="background">
          <div className="content">
            <h1>Build a self care routine suitable for you</h1>
            <p>
              Take our test to get a personalized self-care routine based on
              your needs.
            </p>
            <button className="start-button" onClick={handleStart}>
              Start Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
