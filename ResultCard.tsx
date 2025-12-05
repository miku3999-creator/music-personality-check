import React from 'react';
import { FinalResult } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface Props {
  result: FinalResult;
  onReset: () => void;
}

const ResultCard: React.FC<Props> = ({ result, onReset }) => {
  // Prepare data for Radar Chart
  // We need 4 axes. 
  // A(up) -> C(right) -> L(down) -> P(left) is arbitrary, let's just map them.
  // Values are 1-5.
  const chartData = [
    { subject: 'Activity', A: result.rawScores.FinalAvgA, fullMark: 5 },
    { subject: 'Concrete', A: result.rawScores.FinalAvgC, fullMark: 5 },
    { subject: 'Logic', A: result.rawScores.FinalAvgL, fullMark: 5 },
    { subject: 'Plan', A: result.rawScores.FinalAvgP, fullMark: 5 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          <h2 className="text-sm font-mono text-indigo-300 mb-2 tracking-widest uppercase">Music Personality Type</h2>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-lg">
            {result.code}
          </h1>
          <p className="text-xl md:text-2xl text-white font-bold opacity-90">{result.typeName}</p>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Image & Title */}
          <div className="flex flex-col items-center">
             <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-slate-700 shadow-[0_0_30px_rgba(99,102,241,0.3)] bg-slate-800 flex items-center justify-center relative group">
                {result.imageUrl ? (
                  <img src={result.imageUrl} alt={result.typeName} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-500 text-sm p-4 text-center">
                     <p className="mb-2">Image Generating...</p>
                     <div className="animate-spin h-8 w-8 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
                  </div>
                )}
             </div>
             <h3 className="mt-6 text-xl font-bold text-indigo-300 text-center">{result.title}</h3>
          </div>

          {/* Description & Chart */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
              <p className="text-gray-300 leading-relaxed font-medium">
                {result.body || "結果を分析中..."}
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Radar
                    name="Score"
                    dataKey="A"
                    stroke="#818cf8"
                    strokeWidth={3}
                    fill="#6366f1"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono text-gray-500">
              <div>A: {result.rawScores.FinalAvgA.toFixed(2)}</div>
              <div>C: {result.rawScores.FinalAvgC.toFixed(2)}</div>
              <div>L: {result.rawScores.FinalAvgL.toFixed(2)}</div>
              <div>P: {result.rawScores.FinalAvgP.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-950 flex justify-center">
          <button
            onClick={onReset}
            className="px-8 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-gray-200 transition-colors shadow-lg"
          >
            もう一度診断する
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;