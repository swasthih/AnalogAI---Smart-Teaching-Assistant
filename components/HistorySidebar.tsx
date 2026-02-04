
import React from 'react';
import { HistoryItem } from '../types';

interface Props {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

const HistorySidebar: React.FC<Props> = ({ history, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <aside className="w-full md:w-80 bg-white border-l border-slate-100 p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Recent Topics</h3>
      </div>

      <div className="space-y-3">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full text-left p-4 rounded-2xl border-2 border-slate-50 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all group"
          >
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-bold text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded-md">
                {item.data.level}
              </span>
              <span className="text-[10px] font-medium text-slate-400">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <h4 className="font-semibold text-slate-700 truncate group-hover:text-indigo-700">
              {item.data.topic}
            </h4>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default HistorySidebar;
