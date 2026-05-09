import React, { useState } from "react";
import { createRoot } from "react-dom/client";

const style = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    padding: "20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  container: {
    padding: "40px 30px",
    boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.2)",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  heading: {
    color: "#667eea",
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "clamp(24px, 5vw, 32px)",
  },
  subheading: {
    color: "#764ba2",
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "clamp(14px, 3vw, 18px)",
    fontWeight: "600",
  },
  question: {
    fontWeight: "bold",
    marginBottom: "25px",
    fontSize: "clamp(16px, 4vw, 20px)",
    color: "#333333",
    lineHeight: "1.6",
  },
  options: {
    marginBottom: "15px",
  },
  optionLabel: {
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    borderRadius: "10px",
    cursor: "pointer",
    backgroundColor: "#f5f5f5",
    transition: "all 0.3s ease",
    fontSize: "clamp(14px, 2vw, 16px)",
    color: "#333333",
  },
  optionLabelChecked: {
    backgroundColor: "#667eea",
    color: "#ffffff",
    fontWeight: "600",
  },
  optionLabelDisabled: {
    opacity: 0.7,
  },
  optionInput: {
    marginRight: "10px",
    cursor: "pointer",
    width: "18px",
    height: "18px",
  },
  button: {
    marginTop: "30px",
    padding: "12px 25px",
    border: "none",
    backgroundColor: "#667eea",
    color: "#FFF",
    fontSize: "clamp(14px, 2vw, 16px)",
    fontWeight: "600",
    borderRadius: "10px",
    cursor: "pointer",
    width: "100%",
    transition: "all 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#764ba2",
    transform: "translateY(-2px)",
    boxShadow: "0px 5px 15px rgba(118, 75, 162, 0.4)",
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
    cursor: "not-allowed",
    transform: "none",
  },
  feedback: {
    marginTop: "25px",
    padding: "20px",
    borderRadius: "10px",
    fontSize: "clamp(14px, 2vw, 16px)",
    fontWeight: "600",
    textAlign: "center",
  },
  feedbackCorrect: {
    backgroundColor: "#d4edda",
    color: "#155724",
    border: "2px solid #28a745",
  },
  feedbackWrong: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    border: "2px solid #f5c6cb",
  },
  completionMessage: {
    textAlign: "center",
    color: "#667eea",
    fontSize: "clamp(20px, 5vw, 28px)",
    fontWeight: "bold",
  },
};

export function QuizApp() {
  // do not modify the questions or answers below
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      correct: "Paris",
    },
    {
      id: 2,
      question: "What is the capital of Germany?",
      options: ["Berlin", "Munich", "Frankfurt", "Hamburg"],
      correct: "Berlin",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSubmit = () => {
    console.log(selectedOption);

    if (!selectedOption) return;

    setShowFeedback(true);

    if (selectedOption === currentQuestion.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption("");
    setShowFeedback(false);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  if (isQuizFinished) {
    return (
      <div style={style.wrapper}>
        <div style={style.container}>
          <h2 style={style.completionMessage}>
            <div id="feedback" style={style.feedback}>
              Quiz Complete! You scored {score} out of {questions.length}!
            </div>
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div style={style.wrapper}>
      <div style={style.container}>
        <h1 style={style.heading}>Quiz App</h1>

        <h3 style={style.subheading}>
          Question {currentIndex + 1} of {questions.length}
        </h3>

        <>
          <div id="question" style={style.question}>
            {currentQuestion.question}
          </div>

          {currentQuestion.options.map((option) => {
            const isSelected = selectedOption === option;
            const optionStyles = {
              ...style.optionLabel,
              ...(isSelected && style.optionLabelChecked),
              ...(showFeedback && style.optionLabelDisabled),
            };

            return (
              <div key={option} style={style.options}>
                <label style={optionStyles}>
                  <input
                    type="radio"
                    name="option"
                    value={option}
                    checked={isSelected}
                    onChange={() => {
                      setSelectedOption(option);
                    }}
                    disabled={showFeedback}
                    style={style.optionInput}
                  />{" "}
                  {option}
                </label>
              </div>
            );
          })}

          {!showFeedback ? (
            <button
              style={{
                ...style.button,
                ...(selectedOption && {
                  backgroundColor: "#667eea",
                  cursor: "pointer",
                }),
                ...(!selectedOption && style.buttonDisabled),
              }}
              id="submitBtn"
              onClick={handleSubmit}
              disabled={!selectedOption}
              onMouseEnter={(e) => {
                if (selectedOption) {
                  e.target.style.backgroundColor = "#764ba2";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0px 5px 15px rgba(118, 75, 162, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#667eea";
                e.target.style.transform = "none";
                e.target.style.boxShadow = "none";
              }}
            >
              Submit
            </button>
          ) : (
            <>
              <div style={{ marginTop: "20px" }}>
                {selectedOption === currentQuestion.correct ? (
                  <p
                    style={{
                      ...style.feedback,
                      ...style.feedbackCorrect,
                    }}
                  >
                    ✓ Correct Answer!
                  </p>
                ) : (
                  <p
                    style={{
                      ...style.feedback,
                      ...style.feedbackWrong,
                    }}
                  >
                    ✗ Wrong Answer <br />
                    Correct Answer: <strong>{currentQuestion.correct}</strong>
                  </p>
                )}
              </div>

              <button
                style={style.button}
                onClick={handleNext}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#764ba2";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0px 5px 15px rgba(118, 75, 162, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#667eea";
                  e.target.style.transform = "none";
                  e.target.style.boxShadow = "none";
                }}
              >
                {currentIndex === questions.length - 1
                  ? "Finish Quiz"
                  : "Next Question"}
              </button>
            </>
          )}
        </>
      </div>
    </div>
  );
}

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<QuizApp />);
