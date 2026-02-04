
import React, { useState } from 'react';
import { ExplanationResponse } from '../types';
import QuizCard from './QuizCard';

interface Props {
  result: ExplanationResponse;
}

const ExplanationResult: React.FC<Props> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'analogy' | 'real' | 'quiz'>('analogy');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl shadow-2xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
        {/* Topic Banner */}
        <div className="bg-indigo-600 px-8 py-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-widest mb-3">
              Topic: {result.topic}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">{result.topic}</h2>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
        </div>

        {/* Navigation */}
        <div className="flex border-b border-slate-100 px-4 pt-4">
          {[
            { id: 'analogy', label: '📖 The Analogy', icon: '🎨' },
            { id: 'real', label: '🧠 Real Meaning', icon: '📖' },
            { id: 'quiz', label: '⚡ Quick Quiz', icon: '❓' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-4 text-sm font-bold border-b-2 transition-all ${
                activeTab === tab.id 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === 'analogy' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-2">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🚀</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 italic">"Think of it like this..."</h3>
                  <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-lg">
                    {result.analogy.split('\n').map((line, i) => <p key={i} className="mb-4">{line}</p>)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'real' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-2">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">🔬</div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">The Literal Truth</h3>
                  <div className="prose prose-indigo max-w-none text-slate-600 leading-relaxed text-lg">
                    {result.realMeaning.split('\n').map((line, i) => <p key={i} className="mb-4">{line}</p>)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="animate-in fade-in slide-in-from-right-2">
              <QuizCard quiz={result.quiz} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExplanationResult;
