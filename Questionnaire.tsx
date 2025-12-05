import React from 'react';
import { QUESTIONS } from '../constants';

interface Props {
  answers: Record<number, number>;
  onAnswer: (id: number, value: number) => void;
}

const Questionnaire: React.FC<Props> = ({ answers, onAnswer }) => {
  const currentQuestionIndex = Object.keys(answers).length;
  // Determine which question to show next, or show all in a list? 
  // Let's do a scrolling list for better UX on desktop, or simple list.
  
  // Progress calculation
  const progress = Math.min(100, (Object.keys(answers).length / QUESTIONS.length) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="sticky top-0 z-10 bg-[#0f172a] py-4 mb-6 border-b border-slate-800">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-white">性格診断</h2>
          <span className="text-indigo-400 font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-12 pb-20">
        {QUESTIONS.map((q) => (
          <div key={q.id} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            <p className="text-lg text-white mb-6 font-medium text-center">{q.text}</p>
            
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between text-xs text-gray-400 px-1">
                <span>そう思わない</span>
                <span>そう思う</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={answers[q.id] || 3}
                onChange={(e) => onAnswer(q.id, parseInt(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
              <div className="flex justify-between text-xs font-mono text-slate-500 px-1">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questionnaire;