
import React from 'react';
import { UserLevel } from '../types';

interface TopicInputProps {
  topic: string;
  setTopic: (val: string) => void;
  level: UserLevel;
  onLevelChange: (level: UserLevel) => void;
  onExplain: () => void;
  loading: boolean;
}

const TopicInput: React.FC<TopicInputProps> = ({ 
  topic, 
  setTopic, 
  level, 
  onLevelChange, 
  onExplain,
  loading 
}) => {
  const levels = [
    { value: UserLevel.KID, label: '👦 Kid', color: 'bg-green-100 text-green-700 border-green-200' },
    { value: UserLevel.STUDENT, label: '🎓 Student', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { value: UserLevel.EXPERT, label: '🔬 Expert', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">What do you want to learn?</label>
        <div className="relative group">
          <input 
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onExplain()}
            placeholder="e.g. Quantum Entanglement, The Stock Market, APIs..."
            className="w-full pl-5 pr-14 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white transition-all outline-none text-lg font-medium"
          />
          <button 
            onClick={onExplain}
            disabled={loading || !topic.trim()}
            className="absolute right-2 top-2 bottom-2 px-5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Adjust Level</label>
        <div className="flex flex-wrap gap-3">
          {levels.map((lvl) => (
            <button
              key={lvl.value}
              onClick={() => onLevelChange(lvl.value)}
              className={`px-5 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${
                level === lvl.value 
                  ? `${lvl.color} ring-4 ring-${lvl.value === UserLevel.KID ? 'green' : lvl.value === UserLevel.STUDENT ? 'blue' : 'purple'}-500/10` 
                  : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicInput;
