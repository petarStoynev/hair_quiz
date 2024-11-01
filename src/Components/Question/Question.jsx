import React from "react";
import './Question.css'

function Question(props){
    const { data, onAnswerClick, selectedAnswer} = props;
    const { name, options} = data;

    return(
        <div onClick={onAnswerClick} className="question-container">
            <p>{name}</p>
            <div className="answers-container">
            {options?.map((answer) =>(
                <button
                    key={answer}
                    className={selectedAnswer === answer ? "selected" : undefined}
                    data-answer = {answer}
                >
                    {answer}
                </button>
            ))}
            </div>
        </div>
    );
}

export default Question;