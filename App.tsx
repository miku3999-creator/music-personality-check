import React, { useState, useCallback } from 'react';
import ArtistSelector from './components/ArtistSelector';
import Questionnaire from './components/Questionnaire';
import ResultCard from './components/ResultCard';
import { ARTISTS } from './constants';
import { calculateResults } from './services/logic';
import { generatePersonalityAnalysis, generatePersonalityImage } from './services/gemini';
import { FinalResult } from './types';
import { Music, ArrowRight, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<'welcome' | 'artists' | 'questions' | 'analyzing' | 'result'>('welcome');
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<FinalResult | null>(null);

  const handleArtistToggle = (id: string) => {
    setSelectedArtists((prev) => {
      if (prev.includes(id)) {
        return prev.filter((artistId) => artistId !== id);
      }
      if (prev.length < 10) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleAnswer = (id: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const startDiagnosis = () => {
    setStep('artists');
  };

  const goToQuestions = () => {
    window.scrollTo(0, 0);
    setStep('questions');
  };

  const finishDiagnosis = async () => {
    setStep('analyzing');
    window.scrollTo(0, 0);

    // 1. Calculate Core Logic (Local)
    const calculation = calculateResults(selectedArtists, answers);
    
    // Initial Result State without AI text
    const initialResult: FinalResult = {
      ...calculation,
      title: "Analyzing...",
      body: "AI is crafting your profile...",
      imagePrompt: "",
      rawScores: calculation.rawScores
    };
    setResult(initialResult);

    // 2. Call Gemini for creative text
    const artistNames = ARTISTS.filter(a => selectedArtists.includes(a.id)).map(a => a.name);
    
    try {
      const aiData = await generatePersonalityAnalysis(calculation.code, calculation.typeName, artistNames);
      
      const intermediateResult = {
        ...initialResult,
        title: aiData.title || initialResult.title,
        body: aiData.body || initialResult.body,
        imagePrompt: aiData.imagePrompt || "",
      };
      
      setResult(intermediateResult);
      setStep('result');

      // 3. Call Gemini for Image (Async update)
      if (intermediateResult.imagePrompt) {
        const imageUrl = await generatePersonalityImage(intermediateResult.imagePrompt);
        if (imageUrl) {
          setResult(prev => prev ? { ...prev, imageUrl } : null);
        }
      }

    } catch (e) {
      console.error(e);
      setStep('result');
    }
  };

  const reset = () => {
    setStep('welcome');
    setSelectedArtists([]);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        
        {/* Header (except for result page) */}
        {step !== 'result' && (
          <header className="mb-12 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-500/10 rounded-full mb-4">
              <Music className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
              Music Personality Check
            </h1>
            <p className="text-indigo-200/60 font-medium">16 Types Diagnostic Tool</p>
          </header>
        )}

        <main>
          {step === 'welcome' && (
            <div className="text-center max-w-2xl mx-auto space-y-8 animate-fade-in-up">
              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  あなたの好きなアーティストと、20の質問から<br/>
                  独自の性格タイプを診断します。
                </p>
                <ul className="text-left text-sm text-gray-400 space-y-2 mb-8 inline-block">
                  <li className="flex items-center"><span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>好きなアーティストを選んで音楽的傾向を分析</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>簡単な質問で行動特性を診断</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>AIがあなた専用のキャラクターと解説を生成</li>
                </ul>
                <div>
                  <button
                    onClick={startDiagnosis}
                    className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-lg rounded-full hover:bg-indigo-500 hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                  >
                    <span>診断を始める</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'artists' && (
            <div className="animate-fade-in">
              <ArtistSelector selectedIds={selectedArtists} onToggle={handleArtistToggle} />
              
              <div className="fixed bottom-0 left-0 w-full p-4 bg-[#0f172a]/90 backdrop-blur border-t border-slate-800 z-50 flex justify-center">
                <button
                  onClick={goToQuestions}
                  disabled={selectedArtists.length === 0}
                  className={`
                    px-8 py-3 rounded-full font-bold transition-all shadow-lg flex items-center
                    ${selectedArtists.length > 0 
                      ? 'bg-white text-indigo-900 hover:bg-gray-100 scale-100 opacity-100' 
                      : 'bg-slate-700 text-slate-500 scale-95 opacity-50 cursor-not-allowed'}
                  `}
                >
                  次へ進む ({selectedArtists.length}組選択中)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
              <div className="h-20" /> {/* Spacer for fixed footer */}
            </div>
          )}

          {step === 'questions' && (
            <div className="animate-fade-in">
              <Questionnaire answers={answers} onAnswer={handleAnswer} />
              
              <div className="fixed bottom-0 left-0 w-full p-4 bg-[#0f172a]/90 backdrop-blur border-t border-slate-800 z-50 flex justify-center">
                 {Object.keys(answers).length === 20 ? (
                    <button
                      onClick={finishDiagnosis}
                      className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-bold hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all flex items-center"
                    >
                      診断結果を見る
                      <Music className="w-4 h-4 ml-2" />
                    </button>
                 ) : (
                   <span className="text-gray-500 text-sm font-mono">
                     全ての質問に回答してください ({Object.keys(answers).length}/20)
                   </span>
                 )}
              </div>
            </div>
          )}

          {step === 'analyzing' && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] animate-pulse">
              <Loader2 className="w-16 h-16 text-indigo-500 animate-spin mb-6" />
              <h2 className="text-2xl font-bold text-white mb-2">分析中...</h2>
              <p className="text-indigo-300">音楽の趣味と性格パターンを照合しています</p>
            </div>
          )}

          {step === 'result' && result && (
            <ResultCard result={result} onReset={reset} />
          )}

        </main>
      </div>
    </div>
  );
};

export default App;