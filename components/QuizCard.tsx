
import React, { useState } from 'react';
import { Quiz } from '../types';

interface Props {
  quiz: Quiz;
}

const QuizCard: React.FC<Props> = ({ quiz }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelected(option);
  };

  const handleCheck = () => {
    if (!selected) return;
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h4 className="text-lg font-bold text-slate-800 mb-6 leading-snug">
          {quiz.question}
        </h4>
        
        <div className="grid gap-3">
          {quiz.options.map((option, idx) => {
            const isCorrect = option === quiz.correctAnswer;
            const isSelected = selected === option;
            
            let btnClass = "w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium text-slate-700 ";
            
            if (showResult) {
              if (isCorrect) {
                btnClass += "bg-green-50 border-green-500 text-green-700 shadow-sm shadow-green-100";
              } else if (isSelected) {
                btnClass += "bg-red-50 border-red-500 text-red-700";
              } else {
                btnClass += "bg-white border-slate-100 opacity-50";
              }
            } else {
              btnClass += isSelected 
                ? "bg-indigo-50 border-indigo-500 text-indigo-700" 
                : "bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(option)}
                className={btnClass}
                disabled={showResult}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && isCorrect && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4">
        {!showResult ? (
          <button
            onClick={handleCheck}
            disabled={!selected}
            className="flex-1 bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-100"
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={resetQuiz}
            className="flex-1 bg-slate-800 text-white font-bold py-4 rounded-2xl hover:bg-slate-900 transition-all shadow-lg shadow-slate-200"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizCard;
